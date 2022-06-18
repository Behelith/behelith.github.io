import { useEffect, useRef, useState } from "react";

const getDiscreteValue = (min, max, perc, step = .5) => {
    let range = max - min
    let val = range * perc + min
    const factor = parseInt(val / step)

    let discreteValue = factor * step

    if (step % 1 == 0)
        return parseInt(discreteValue)
    return parseFloat(discreteValue)
}

const getDiscretePercent = (min, max, value) => {
    let range = max - min
    let perc
    if (min * max < 0) {
        // min & max have opposite signs
        perc = (value - min) / range
    } else if (min < 0) {
        //  same signs : negative
        perc = (value - min) / range
    } else {
        //  same signs : positive
        perc = (value - min) / range
    }
    // console.log({ min, max, value, value, range, perc });
    return perc
}





const RangeInput = props => {
    const [value, setValue] = useState(
        typeof props.value == 'number'
            ? props.value
            : typeof props.min == 'number' ? props.min
                : 0
    )
    const step = typeof props.step == 'number' ? props.step : 1
    const min = typeof props.min == 'number' ? props.min : 0
    const max = typeof props.max == 'number' ? props.max : 100

    const refHandler = useRef()
    const refWrapper = useRef()
    const refHandlerParentRect = useRef()

    const updateValue = (value) => {
        setValue(value)
        if (props.onValueChange) props.onValueChange(value)
    }



    const onGrab = (e) => {
        refHandlerParentRect.current = e.target.parentElement.getBoundingClientRect();

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', onRelease)

        document.addEventListener('touchend', onRelease)
        document.addEventListener('touchmove', onMove)

        onMove(e)
    }

    const onMove = (e) => {
        let xPos = 0
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            xPos = e.touches[0].clientX - refHandlerParentRect.current.x
        } else {
            xPos = e.clientX - refHandlerParentRect.current.x
        }

        let xPercPos = xPos / refHandlerParentRect.current.width

        if (xPos > refHandlerParentRect.current.width) xPercPos = 1
        else if (xPos < 0) xPercPos = 0

        const discreteValue = getDiscreteValue(min, max, xPercPos, step)
        const discretePercent = getDiscretePercent(min, max, discreteValue)

        refHandler.current.style.left = (discretePercent * 100) + '%'

        updateValue(discreteValue)
    }



    const onRelease = (e) => {
        refHandlerParentRect.current = null

        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onRelease)

        document.removeEventListener('touchend', onRelease)
        document.removeEventListener('touchmove', onMove)
    }

    useEffect(() => {
        if (refWrapper.current) {

            refWrapper.current.addEventListener('mousedown', onGrab)
            refWrapper.current.addEventListener('touchstart', onGrab)


            // const discreteValue = getDiscreteValue(min, max, xPercPos, step)
            const discretePercent = getDiscretePercent(min, max, value)

            refHandler.current.style.left = (discretePercent * 100) + '%'

        }

        // if (refWrapper.current) {
        //     refWrapper.current.addEventListener('mousedown', (e) => {
        //         console.log('refWrapper mousedown', e.target);
        //     })
        // }

        return () => {
            // refHandler.current.removeEventListener('mousedown', onGrab)
            // refHandler.current.removeEventListener('touchstart', onGrab)
        }

    }, [])

    return (
        <div className="app-input">
            <div ref={refWrapper} className="app-input__control">
                <div className="app-input__control__range">
                    <div ref={refHandler} className="app-input__control__range__handler"></div>
                </div>
            </div>
            <div className="app-input__info">
                {props.label ? <p className="app-input__info__label">{props.label}</p> : null}
                <p className="app-input__info__value">{
                    value % 1 == 0 ? value : parseFloat(value).toFixed(2)
                }</p>
            </div>
        </div>
    );
}

export default RangeInput;