import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { LangContext } from "../../contexts/LangContext"
import useTheme from "../../hooks/useTheme"
import dictionary from "../../utils/lang"

const NavBar = props => {

    const langContext = useContext(LangContext)
    const [theme, setTheme] = useTheme()
    const [mobileActive, setMobileActive] = useState(false)

    const closeMobileNav = () => setMobileActive(false)


    // console.log(langContext);
    // return <div>nav</div>

    // theme buttons
    const themeLightButton = <button className="icon-button" onClick={() => {
        setTheme('light')
        closeMobileNav()
    }}> <i className="fa fa-sun" /> </button>
    const themeDarkButton = <button className="icon-button" onClick={() => {
        setTheme('dark')
        closeMobileNav()
    }}> <i className="fa fa-moon" /> </button>

    const langButton = <button className="icon-button" onClick={() => {
        langContext.toggleLang()
        closeMobileNav()
    }}>{langContext.lang.toLowerCase() == 'en' ? 'PL' : "EN"}</button>


    const navContent = <div className="nav-content centered  fade-in">
        <NavLink to="/">{dictionary.NAV_ABOUT[langContext.lang]}</NavLink>
        {/* <NavLink to="/contact">Contact</NavLink> */}
        <NavLink to="/skills" >{dictionary.NAV_SKILLS[langContext.lang]}</NavLink>
        {/* <NavLink to="/background-controller" ><i className="fa fa-cog" /></NavLink> */}
        <NavLink to="/background-controller" >{dictionary.NAV_CONTROLS[langContext.lang]}</NavLink>
        <p>|</p>
        <div className="app-nav-config ">
            {theme == 'dark' ? themeLightButton : themeDarkButton}
            {langButton}
        </div>
    </div>

    const navMobileContent = (
        <div className="nav-content centered">
            <NavLink onClick={closeMobileNav} to="/">{dictionary.NAV_ABOUT[langContext.lang]}</NavLink>
            <NavLink onClick={closeMobileNav} to="/skills" >{dictionary.NAV_SKILLS[langContext.lang]}</NavLink>
            <NavLink onClick={closeMobileNav} to="/background-controller" >{dictionary.NAV_CONTROLS[langContext.lang]}</NavLink>
        </div>)

    const navMobile = <div className="app-nav-config ">
        <button className="icon-button toggle-button"
            onClick={() => { setMobileActive(!mobileActive) }}
        > <i className="fa fa-bars"></i> </button>

        {theme == 'dark' ? themeLightButton : themeDarkButton}
        {langButton}
    </div>

    const navBar = <nav className="app-nav max fade-in">
        {navContent}
    </nav>

    const mobileNavBar = <nav className='app-nav min-mid mobile fade-in'>
        {navMobile}
        {mobileActive ? navMobileContent : null}
    </nav>


    return (
        <>
            {navBar}
            {mobileNavBar}
        </>
    );
}

export default NavBar;