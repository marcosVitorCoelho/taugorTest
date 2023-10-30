import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { UserAuthenticationContextProvider } from "./contexts/UserAuthContext"
import { CssBaseline } from "@mui/material"
import { GlobalStyle } from "./style/GlobalStyle"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./style/themes/default"
import { EmployeeContextProvider } from "./contexts/EmployeeContext"

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <GlobalStyle />
      <UserAuthenticationContextProvider>
        <EmployeeContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </EmployeeContextProvider>
      </UserAuthenticationContextProvider>
    </ThemeProvider>
  )
}

export default App
