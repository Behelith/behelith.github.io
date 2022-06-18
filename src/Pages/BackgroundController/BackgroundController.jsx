import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { AnimatedBackgroundControls } from "../../components/AnimBackground/EngineContext";

const BackgroundController = props => {
    const langContext = useContext(LangContext)

    if (langContext.lang == 'pl') return (<div className='fade-in'>
        <p className="page__watermark">Tło</p>
        <p className="page__label">Kontroler tła</p>
        <p>Tutaj możesz użyć suwaków do zmiany zachowania tła</p>
        <AnimatedBackgroundControls lang={langContext.lang} />
    </div>)

    return (
        <div className='fade-in'>
            <p className="page__watermark">Background</p>
            <p className="page__label">Background Controller</p>
            <p>Here you can use sliders to play with background</p>


            <AnimatedBackgroundControls lang={langContext.lang} />
        </div>
    );
}

export default BackgroundController;