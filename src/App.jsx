import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedBackground } from './components/AnimBackground/EngineContext'
import BackgroundController from './Pages/BackgroundController/BackgroundController'
import About from './Pages/About/About'
import Page404 from './Pages/Page404/Page404'
import Skills from './Pages/Skills/Skills'
import NavBar from './components/NavBar/NavBar'
import { LangContext } from './contexts/LangContext'
import useScroll from './hooks/useScroll'

function App() {
  const langContext = useContext(LangContext)

  const [scrollTopButtonVisible, setScrollTopButtonVisible] = useState(false)

  useScroll(threshhold => {
    if (threshhold > 64) setScrollTopButtonVisible(true)
    else setScrollTopButtonVisible(false)
  })

  const footer = <div className='app-footer fade-in'>
    <p>...</p>
    <p>Adrian Fijałkowski | Copyright &copy; 2022</p>
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

        {scrollTopButtonVisible ? <button className="floating-button floating-button--right fade-in" onClick={e => window.scrollTo(0, 0)}>
          <i className="fa fa-arrow-up"></i>
        </button> : null}

      </div>
    </>

  )
}

export default App
