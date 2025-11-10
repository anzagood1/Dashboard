import { useState } from 'react'
import { Grid } from '@mui/material';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <Grid>

      {/* Encabezado */}
      <Grid>Elemento: Encabezado</Grid>

      {/* Alertas */}
      <Grid>Elemento: Alertas</Grid>

      {/* Selector */}
      <Grid>Elemento: Selector</Grid>

      {/* Indicadores */}
      <Grid>Elemento: Indicadores</Grid>

      {/* Gráfico */}
      <Grid>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

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
