import { useEffect, useState } from "react";

const useLang = () => {
    const [lang, setLang] = useState('en')

    // useEffect(() => {
    //     if (localStorage.lang) toggleLang(localStorage.lang)
    //     else if (window.navigator.language === 'pl-PL') toggleLang('pl')
    //     else toggleLang('en')
    // }, [])

    // const toggleLang = (lang) => {
    //     setLang(lang)
    //     localStorage.lang = lang
    // }


    return [lang, toggleLang]
}

export default useLang;