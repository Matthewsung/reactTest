import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'
import {
  createTheme,
  ThemeProvider,
  Palette,
  PaletteOptions,
} from "@mui/material";

declare module '@mui/material' {
  interface  Palette {
    custom: Palette['primary'],
  }
  interface PaletteOptions {
    custom: PaletteOptions['primary']
  }
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

const theme = createTheme( {
  palette: {
    custom: {
      main: '#ff00ff'
    }
  }
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
