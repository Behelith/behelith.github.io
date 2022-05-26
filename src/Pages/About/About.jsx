import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

const About = props => {
    const langContext = useContext(LangContext)

    if (langContext.lang == 'pl') return (<div className='page fade-in'>
        <p className="page-watermark">O mnie</p>
        <p className="page-label">Cześć, jestem Adrian!</p>

        <p className="page-text">
            Moja przygoda jako frontend developer rozpoczęła się około roku 2017 i od tamtej pory odkrywam co do zaoferowania ma JavaScript. Przez większość czasu zajmowałem się Vanilla JS ponieważ pozwala na wszechstronność użycia. Dopiero kiedy trochę zrozumiałem podstawy poszukałem pomocnych frameworków. Podobnie był w kwestii CSS i HTML. Śmiało polecam <a className="external-link" href="https://reactjs.org/" target='_blank'>React</a> oraz <a className="external-link" href="https://www.w3schools.com/w3css/default.asp" target='_blank'>W3.CSS</a>.
        </p>

        <p className="page-text">Niewdawno moją uwagę przykuł również backend i postanowiłem przyjrzeć się <a className="external-link" href="https://nodejs.org/en/" target='_blank'>Node.js</a></p>
    </div>)

    return (
        <div className='fade-in'>
            <p className="page-watermark">About</p>
            <p className="page-label">Hi, I'm Adrian!</p>

            <p className="page-text">My adventure as developer has started around 2017 and since then I'm discovering what JavaScript has to offer. Most of the time I've been working with vanilla JS because of flexibility of use it provided. Once I understood basics, I decided to look for some helpful frameworks. Similarily when it comes to CSS and HTML. I recommend <a className="external-link" href="https://reactjs.org/" target='_blank'>React</a> and <a className="external-link" href="https://www.w3schools.com/w3css/default.asp" target='_blank'>W3.CSS</a> for everyone. </p>

            <p className="page-text">Recently backend dev also caught my attention and I decided to try <a className="external-link" href="https://nodejs.org/en/" target='_blank'>Node.js</a></p>
        </div>)
}

export default About;