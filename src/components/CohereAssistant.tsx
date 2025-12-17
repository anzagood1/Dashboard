import { useState, useRef } from 'react';
import { CohereClientV2 } from "cohere-ai";
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import { Card, CardContent, Typography, Button, CircularProgress, Alert, Box, Paper, Avatar } from '@mui/material';

interface CohereAssistantProps {
    weatherData: OpenMeteoResponse | undefined;
}

const CohereAssistant = ({ weatherData }: CohereAssistantProps) => {
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const lastCallTime = useRef<number>(0);
    const COOLDOWN_MS = 60000; // 1 minuto de espera entre llamadas para controlar el límite

    const handleAnalyze = async () => {
        if (!weatherData) return;

        const now = Date.now();
        if (now - lastCallTime.current < COOLDOWN_MS) {
            const remaining = Math.ceil((COOLDOWN_MS - (now - lastCallTime.current)) / 1000);
            setError(`Límite de llamadas: Por favor espera ${remaining} segundos.`);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const token = 'qY6OIeU0MdIyBMfYIdi4E8MEFu1YXbEXXKjX3Pov';
            

            const cohere = new CohereClientV2({
                token: token, 
            });

            const prompt = `
                Actúa como un asistente meteorológico experto. Analiza los siguientes datos del clima y proporciona:
                1. Un resumen breve de la situación actual.
                2. Recomendaciones prácticas para las personas (ropa, actividades, precauciones).
                
                Datos del clima:
                - Temperatura: ${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}
                - Sensación Térmica: ${weatherData.current.apparent_temperature} ${weatherData.current_units.apparent_temperature}
                - Humedad: ${weatherData.current.relative_humidity_2m} ${weatherData.current_units.relative_humidity_2m}
                - Viento: ${weatherData.current.wind_speed_10m} ${weatherData.current_units.wind_speed_10m}
            `;

            const response = await cohere.chat({
                model: 'command-a-03-2025', 
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });

            if (response.message && response.message.content && response.message.content.length > 0) {
                 const content = response.message.content[0];
                 if ('text' in content) {
                     setResponse(content.text);
                 } else {
                     setResponse("No se recibió respuesta de texto del asistente.");
                 }
            } else {
                 setResponse("No se recibió respuesta del asistente.");
            }
            
            lastCallTime.current = Date.now();

        } catch (err: any) {
            console.error(err);
            setError("Error al conectar con Cohere: " + (err.message || "Error desconocido"));
        } finally {
            setLoading(false);
        }
    };

    const parseBold = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <Box component="span" fontWeight="bold" color="text.primary" key={index}>
                        {part.replace(/\*\*/g, '')}
                    </Box>
                );
            }
            return part;
        });
    };

    const formatResponse = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, index) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('###')) {
                const title = trimmedLine.replace(/^###\s*/, '');
                return (
                    <Typography key={index} variant="h6" color="primary.main" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                        {parseBold(title)}
                    </Typography>
                );
            }
            
            if (trimmedLine.startsWith('---')) {
                 return <Box key={index} sx={{ my: 2, borderBottom: '1px solid', borderColor: 'divider' }} />;
            }

            if (trimmedLine.startsWith('-')) {
                 const content = trimmedLine.replace(/^-/, '').trim();
                 return (
                    <Box key={index} display="flex" alignItems="flex-start" sx={{ ml: 2, mb: 1 }}>
                        <Typography variant="body1" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>•</Typography>
                        <Typography variant="body1" component="div">
                            {parseBold(content)}
                        </Typography>
                    </Box>
                 );
            }

            if (trimmedLine === '') {
                return <Box key={index} sx={{ height: 8 }} />;
            }

            return (
                <Typography key={index} variant="body1" paragraph sx={{ mb: 1 }}>
                    {parseBold(line)}
                </Typography>
            );
        });
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        🤖
                    </Avatar>
                    <Typography variant="h5" component="div" fontWeight="bold">
                        Asistente IA
                    </Typography>
                </Box>
                
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 3, 
                        mb: 3, 
                        flexGrow: 1, 
                        bgcolor: 'action.hover', 
                        borderRadius: 2,
                        minHeight: '200px', 
                        maxHeight: '400px', 
                        overflowY: 'auto',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    {loading ? (
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress size={40} thickness={4} />
                            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                Analizando datos del clima...
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'left' }}>
                            {response ? formatResponse(response) : (
                                <Typography variant="body1" color="text.secondary" fontStyle="italic" align="center" sx={{ mt: 4 }}>
                                    Hola, soy tu asistente meteorológico. <br/>
                                    Presiona el botón <strong>"Consultar a Cohere"</strong> para recibir un resumen y recomendaciones basadas en el clima actual.
                                </Typography>
                            )}
                        </Box>
                    )}
                </Paper>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAnalyze}
                    disabled={loading || !weatherData}
                    fullWidth
                    size="large"
                    sx={{ mt: 'auto', borderRadius: 2, py: 1.5, fontWeight: 'bold' }}
                >
                    {loading ? 'Procesando...' : 'Consultar a Cohere'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default CohereAssistant;
