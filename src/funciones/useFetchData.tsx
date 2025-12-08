import type { OpenMeteoResponse, FetchDataOutput } from "../types/DashboardTypes";
import { useState, useEffect, useCallback} from "react";



export default function useFetchData(): FetchDataOutput { 
    
    const[dataState, setDataState] = useState<FetchDataOutput>({
        data: undefined,
        loading: true,
        error: null
    });

    const handleFetch = useCallback(
    async () => {
        try {
            const url = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';
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
    [],
)

    useEffect(() => {
        if(dataState.data === undefined) handleFetch();
     }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado
    return { 
        ...dataState
     };
}

