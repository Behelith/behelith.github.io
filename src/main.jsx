import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './css/index.css'
import './css/all.css'

import { BackgroundContextProvider } from './components/AnimBackground/EngineContext'
import { LangContextProvider } from './contexts/LangContext'

const strict = <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
</React.StrictMode>

const nonStrict =
  <HashRouter>
    <App />
  </HashRouter>

ReactDOM.createRoot(document.getElementById('root')).render(
  <BackgroundContextProvider>
    <LangContextProvider>
      {strict}
      {/* // nonStrict */}
    </LangContextProvider>
  </BackgroundContextProvider>
)
