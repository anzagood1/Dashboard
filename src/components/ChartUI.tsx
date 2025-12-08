import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';


interface ChartUIProps {
    data: OpenMeteoResponse | undefined;
}
export default function ChartUI(dataProps: ChartUIProps) {
   const time = dataProps.data?.hourly.time.slice(0, 10) || [];
   let formattedTime: string[] = [];
   for (let t of time){
      t = t.substring(11,16);
      formattedTime.push(t);
   }
   const timeFormatted = formattedTime;
   const temperature = dataProps.data?.hourly.temperature_2m.slice(0, 10) || [];
   const windSpeed = dataProps.data?.hourly.wind_speed_10m.slice(0, 10) || [];
   return (
      <>
         <Typography variant="h5" component="div">
            Chart time vs Temperature (2m) & Wind Speed (10m)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temperature, label: 'Temperature (2m)'},
               { data: windSpeed, label: 'Wind Speed (10m)'},
            ]}
            xAxis={[{ scaleType: 'point', data: timeFormatted }]}
         />
      </>
   );
}