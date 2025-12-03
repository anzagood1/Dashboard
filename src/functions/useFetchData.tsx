import type { OpenMeteoResponse } from "../types/DashboardTypes";
import { useState, useEffect} from "react";

export default function useFetchData(): OpenMeteoResponse | undefined { 
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto';  
    
    const [data, setData] = useState<OpenMeteoResponse>();
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(URL);
            const json = (await res.json());
            setData(json);
        };
        fetchData();
     }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado
    return data;
}