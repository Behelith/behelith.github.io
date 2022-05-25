import { useEffect, useRef } from "react";

const useScroll = scrollCallback => {
    const refOnScroll = useRef(null)

    useEffect(() => {

        refOnScroll.current = e => {
            // console.log(document.scrollingElement.offsetTop)

            if (typeof scrollCallback === 'function') scrollCallback(window.pageYOffset)
        }

        window.addEventListener('scroll', refOnScroll.current)

        return () => {
            window.removeEventListener('scroll', refOnScroll.current)
        }


    })


    return scroll;
}

export default useScroll;