//import { useState } from 'react'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center" >

      {/* Encabezado */}
      <Grid size={12} ><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={12}><AlertUI description="No se proveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3}}>Elemento: Selector</Grid>

      {/* Indicadores */}
      <Grid size={{ xs: 12, md: 9}}>Elemento: Indicadores</Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6}} sx={{display : {xs: "none", md: "block"}}} >Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6}} sx={{display : {xs: "none", md: "block"}}}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12}}>Elemento: Información adicional</Grid>

    </Grid>

  )
  /*
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
*/
}

export default App
