import { createContext, useEffect, useState } from "react";


// export const LangContext = createContext({ lang: localStorage.getItem('lang') });
export const LangContext = createContext({ lang: localStorage.lang || 'en' });

export const LangContextProvider = (props) => {
  const [lang, setLang] = useState(localStorage.lang || 'en');
  
  // useEffect(() => {
  //   console.log("%clang context init", 'color:#0fa', lang);
  //   setLang('en')
  // }, []);

  useEffect(() => {
    // console.log("%clang context set", 'color:#0fa', lang);
  }, [lang]);

  const toggleLang = (_lang) => {
    // console.log("%c toggleLang", 'color:#0fa', _lang);

    if (!_lang) _lang = lang === 'pl' ? 'en' : 'pl'

    localStorage.setItem('lang', _lang)
    setLang(_lang)
  }

  // const toggleLang = () => {
  //   if (lang === 'pl') setLang('en')
  //   else if (lang === 'en') setLang('pl')
  // }

  return (<LangContext.Provider value={{
    lang,
    toggleLang
  }}>
    {props.children}
  </LangContext.Provider>);
};
