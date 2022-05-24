import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState('default')

    useEffect(() => {
        if (localStorage.theme) changeTheme(localStorage.theme)
        else changeTheme('dark')
    }, [])

    const changeTheme = (theme) => {
        setTheme(theme)

        switch (theme) {
            case 'light': document.body.className = 'light'; break;
            case 'dark': document.body.className = 'dark'; break;
            default:
                document.body.className = ''
                break;
        }

        localStorage.theme = theme
    }


    return [theme, changeTheme]
}

export default useTheme;