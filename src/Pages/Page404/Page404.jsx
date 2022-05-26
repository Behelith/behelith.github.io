import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

const Page404 = props => {
    const langContext = useContext(LangContext)


    if (langContext.lang == 'pl') return (
        <div className='fade-in'>
            <p className="page-watermark">404</p>
            <p className="page-label">404 :(</p>
            <p>Jestem przekonany, że chodziło co coś ważnego, ale tutaj tego nie ma</p>
        </div>
    );

    return (
        <div className='fade-in'>
            <p className="page-watermark">404</p>
            <p className="page-label">404 :(</p>
            <p>I am sure you were looking for something important, but it's not here</p>
        </div>
    );
}

export default Page404;