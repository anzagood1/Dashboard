import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
}

export default function AlertUI(config: AlertConfig) {
    if (config.description.includes("¡Atención!")) {
        return (
            <Alert variant="outlined" severity="info"> {config.description}</Alert>
        );
    } else {
        return (
            <Alert variant="outlined" severity="success"> {config.description}</Alert>
        );
    }
}   
