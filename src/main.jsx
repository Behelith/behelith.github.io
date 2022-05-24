import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './css/index.css'
import './css/all.css'

import { BackgroundContextProvider } from './components/AnimBackground/EngineContext'
import { LangContextProvider } from './contexts/LangContext'

const strict = <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>

const nonStrict =
  <BrowserRouter>
    <App />
  </BrowserRouter>

ReactDOM.createRoot(document.getElementById('root')).render(
  <BackgroundContextProvider>
    <LangContextProvider>
      {strict}
      {/* // nonStrict */}
    </LangContextProvider>
  </BackgroundContextProvider>
)
