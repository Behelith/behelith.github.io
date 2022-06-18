import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { LangContext } from "../../contexts/LangContext"
import useScroll from "../../hooks/useScroll"
import useTheme from "../../hooks/useTheme"
import dictionary from "../../utils/lang"

const NavBar = props => {

    const langContext = useContext(LangContext)
    const [theme, setTheme] = useTheme()
    const [mobileActive, setMobileActive] = useState(false)

    const [navBackgroundVisible, setNavBackgroundVisible] = useState(false)

    const closeMobileNav = () => setMobileActive(false)

    useScroll(threshhold => {
        if (threshhold > 64) setNavBackgroundVisible(true)
        else setNavBackgroundVisible(false)
    })

    const langButton = <button className="nav__menu__button" onClick={() => {
        langContext.toggleLang()
        closeMobileNav()
    }}>{langContext.lang.toLowerCase() == 'en' ? 'PL' : "EN"}</button>


    const navClasses = ['nav']
    if (navBackgroundVisible || mobileActive) navClasses.push('nav--solid')

    return (
        <div className={navClasses.join(' ')}>
            <div className="nav__menu nav__menu--centered fade-in">
                <NavLink className="nav__menu__button" to="/">{dictionary.NAV_ABOUT[langContext.lang]}</NavLink>
                <NavLink className="nav__menu__button" to="/skills" >{dictionary.NAV_SKILLS[langContext.lang]}</NavLink>
                <NavLink className="nav__menu__button" to="/background-controller" >{dictionary.NAV_CONTROLS[langContext.lang]}</NavLink>

                {theme == 'dark' ? <button className="nav__menu__button" onClick={() => {
                    setTheme('light')
                }}> <i className="fa fa-sun" /> </button> : <button className="nav__menu__button" onClick={() => {
                    setTheme('dark')
                }}> <i className="fa fa-moon" /> </button>}

                <button className="nav__menu__button" onClick={() => {
                    langContext.toggleLang()
                    closeMobileNav()
                }}>{langContext.lang.toLowerCase() == 'en' ? 'PL' : "EN"}</button>
            </div>

            <div className="nav__menu nav__menu--mobile fade-in">
                <button className="nav__menu__button nav__menu__button--margin-right "
                    onClick={() => { setMobileActive(!mobileActive) }}
                > <i className="fa fa-bars"></i> </button>
                {theme == 'dark' ? <button className="nav__menu__button" onClick={() => {
                    setTheme('light')
                    closeMobileNav()
                }}> <i className="fa fa-sun" /> </button> : <button className="nav__menu__button" onClick={() => {
                    setTheme('dark')
                    closeMobileNav()
                }}> <i className="fa fa-moon" /> </button>}
                {langButton}
            </div>

            {mobileActive ? (
                <div className="nav__menu__dropdown nav__menu__dropdown--mobile fade-in">
                    <NavLink className="nav__menu__dropdown__button" onClick={closeMobileNav} to="/">{dictionary.NAV_ABOUT[langContext.lang]}</NavLink>
                    <NavLink className="nav__menu__dropdown__button" onClick={closeMobileNav} to="/skills" >{dictionary.NAV_SKILLS[langContext.lang]}</NavLink>
                    <NavLink className="nav__menu__dropdown__button" onClick={closeMobileNav} to="/background-controller" >{dictionary.NAV_CONTROLS[langContext.lang]}</NavLink>
                </div>
            ) : null}
        </div>
    );
}

export default NavBar;