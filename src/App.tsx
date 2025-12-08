//import { useState } from 'react'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './funciones/useFetchData';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const {data, loading, error} = useFetchData();
  const showData = (title: string) => {
    if(loading) return <IndicatorUI title={title} description="Cargando..." />;
    if(error) return <IndicatorUI title={title} description={error} />;
  }

  
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center" >

      {/* Encabezado */}
      <Grid size={12} ><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={12}><AlertUI description="No se proveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3}}><SelectorUI /></Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9}}>
              <Grid container size={{ xs: 12, md: 9 }} >

                 <Grid size={{ xs: 12, md: 3 }}>
                         {showData('Temperatura (2m)')}
                         {(data != undefined) &&
                            (<IndicatorUI
                              title='Temperatura (2m)'
                              description={ `${data.current.temperature_2m} 
                              ${data.current_units.temperature_2m}` } />)
                        }
                
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                        {showData('Temperatura aparente')}
                        {(data != undefined) && 
                        (<IndicatorUI title='Temperatura aparente' description={
                      `${data.current.apparent_temperature} 
                      ${data.current_units.apparent_temperature}` } />)
                        }
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                        {showData('Velocidad del viento')}
                        {(data != undefined) && 
                        (<IndicatorUI title='Velocidad del viento' description={
                      `${data.current.wind_speed_10m} 
                      ${data.current_units.wind_speed_10m}` } />)
                        }
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                        {showData('Humedad relativa')}
                        {(data != undefined) && 
                        (<IndicatorUI title='Humedad relativa' description={
                      `${data.current.relative_humidity_2m} 
                      ${data.current_units.relative_humidity_2m}` } />)
                        }
                 </Grid>

            </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6}} sx={{display : {xs: "none", md: "block"}}} >Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6}} sx={{display : {xs: "none", md: "block"}}}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12}}>Elemento: Información adicional</Grid>

    </Grid>

  )
  
}

export default App
