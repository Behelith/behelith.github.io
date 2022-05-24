import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedBackground } from './components/AnimBackground/EngineContext'
import BackgroundController from './Pages/BackgroundController/BackgroundController'
import About from './Pages/About/About'
import Page404 from './Pages/Page404/Page404'
import Skills from './Pages/Skills/Skills'
import NavBar from './components/NavBar/NavBar'
import { LangContext } from './contexts/LangContext'

function App() {
  const langContext = useContext(LangContext)

  const footer = <div className='app-footer fade-in'>
    Adrian Fijałkowski | Copyright &copy; 2022
    {/* Lorem | Copyright &copy; 2022 */}
  </div>


  const contentLang = langContext?.lang

  return (
    <>
      <AnimatedBackground />

      <div className="App " key={`app-content-${contentLang}`}>

        <NavBar />

        <div className="app-content" >
          {/* <p>{location.pathname}</p> */}

          <Routes>
            {/* <Route path='/contact' element={dummyContact} /> */}
            <Route path='/skills' element={<Skills />} />
            <Route path='/home' element={<About />} />
            <Route path='/background-controller' element={<BackgroundController />} />
            <Route path='/' element={<About />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>

        {footer}

      </div>
    </>

  )
}

export default App
