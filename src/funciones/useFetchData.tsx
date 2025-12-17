import type { OpenMeteoResponse, FetchDataOutput } from "../types/DashboardTypes";
import { useState, useEffect, useCallback} from "react";


// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'quito': { latitude: -0.2298, longitude: -78.525 },
  'manta': { latitude: -0.9494 , longitude: -80.7314 },
  'cuenca': { latitude: -2.9006, longitude: -79.0045 },
}
export default function useFetchData(selectedOption: string | null): FetchDataOutput { 
    
    const[dataState, setDataState] = useState<FetchDataOutput>({
        data: undefined,
        loading: true,
        error: null
    });

    const handleFetch = useCallback(
    async () => {
        setDataState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["guayaquil"];
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation`;
            const res = await fetch(url);
            if(!res.ok) throw new Error(res.statusText);
            const meteoResponse: OpenMeteoResponse = await res.json();
            setDataState( prev => ({
                ...prev,
                data: meteoResponse,
                loading: false,
        
            }))

        }catch (error) {
            setDataState( prev => ({
                ...prev,
                loading: false,
                error: (error as Error).message
            }))
        }
    },
    [selectedOption],
)

    useEffect(() => {
        handleFetch();
     }, [handleFetch]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado
    return { 
        ...dataState
     };
}

