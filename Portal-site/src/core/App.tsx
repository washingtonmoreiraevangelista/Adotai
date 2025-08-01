import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AppRouter } from './router'

const App = () => {
  return (
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App