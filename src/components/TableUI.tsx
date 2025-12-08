import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Tiempo',
      width: 125,
   },
   {
      field: 'value1',
      headerName: 'Temperatura (2m)',
      width: 125,
      valueFormatter: (value) => `${value}°C`
   },
   {
      field: 'value2',
      headerName: 'Velocidad del viento (10m)',
      width: 125,
      valueFormatter: (value) => `${value}km/h`
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100,
      valueGetter: (_, row) => `${row.label || ''} | ${row.value1 || ''}°C |  ${row.value2 || ''}km/h`,
   },
];

//const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
//const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
//const arrLabels = ['A','B','C','D','E','F','G'];

interface TableUIProps {
    data: OpenMeteoResponse | undefined;
}
export default function TableUI(dataProps: TableUIProps) {
   const time = dataProps.data?.hourly.time.slice(0, 10) || [];
   let formattedTime: string[] = [];
   for (let t of time){
      t = t.substring(11,16);
      formattedTime.push(t);
   }
   const timeFormatted = formattedTime;
   const temperature = dataProps.data?.hourly.temperature_2m.slice(0, 10) || [];
   const windSpeed = dataProps.data?.hourly.wind_speed_10m.slice(0, 10) || [];

   const rows = combineArrays(timeFormatted, temperature, windSpeed);
    
   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}