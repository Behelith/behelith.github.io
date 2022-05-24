import { createContext, useContext, useEffect, useRef, useState } from "react";
import RangeInput from "../Inputs/RangeInput";
import DotEngine from "./DotEngine/DotEngine";
import TriangleEngine from "./TriangleEngine/TriangleEngine";


const updateCanvas = (canvas) => {
    if (!canvas) return

    if (canvas.height != canvas.offsetHeight || canvas.width != canvas.offsetWidth) {
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
    }
}

const controlsDictionary = {
    entitiesLimit: { pl: 'Limit cząsteczek', en: 'Particle limit' },
    decay: { pl: 'Współczynnik wygasania', en: 'Decay rate' },
    particleSize: { pl: 'Rozmiar cząsteczek', en: 'Particle size' },
    particleSpeed: { pl: 'Szybkość cząsteczek', en: 'Particle speed' },
    direction: { pl: 'Kierunek (w stopniach)', en: 'Direction (degrees)' },
    growthRate: { pl: 'Współczynnik wzrostu', en: 'Growth rate' },
}

export const BackgroundContext = createContext()

export const BackgroundContextProvider = (props) => {

    let canvasRef = useRef()
    const canvas = <canvas ref={canvasRef} className="animated-canvas" />

    const engineRef = useRef(new DotEngine())
    // const engineRef = useRef(new TriangleEngine())
    const updateRef = useRef()
    const nowRef = useRef(new Date().getTime())


    const update = () => {
        // console.log('BackgroundContextProvider.update()', engineRef.current, canvasRef.current);
        if (engineRef.current && canvasRef.current) {
            updateCanvas(canvasRef.current)

            let then = nowRef.current
            nowRef.current = new Date().getTime()
            let delta = nowRef.current - then

            updateCanvas(canvasRef.current)
            engineRef.current.update(canvasRef.current, delta)
            engineRef.current.draw(canvasRef.current.getContext('2d'))
        }

        updateRef.current = requestAnimationFrame(update)
    }

    const setDotEngine = () => { engineRef.current = new DotEngine() }
    const setTriangleEngine = () => { engineRef.current = new TriangleEngine() }
    const setEngineDisabled = () => {
        engineRef.current = null
        if (canvasRef.current) canvasRef.current.getContext('2d')
            .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    useEffect(() => {
        requestAnimationFrame(update)

        return () => {
            cancelAnimationFrame(update)
        }

    }, [])

    return (<BackgroundContext.Provider value={{
        canvas,
        // canvas: null,
        // canvas: canvasRef.current,
        engine: engineRef.current
    }}>
        {props.children}
        {/* <div>
            <button onClick={setDotEngine}>dot</button>
            <button onClick={setTriangleEngine}>triangle</button>
            <button onClick={setEngineDisabled}>disable</button>
        </div> */}
    </BackgroundContext.Provider>)
};

export const AnimatedBackground = props => {
    const background = useContext(BackgroundContext)
    return background.canvas
}

const DotEngineControls = (props) => {

    const [controls, setControls] = useState(props.engine.getConfig())
    const [advancedControls, setAdvancedControls] = useState(props.engine.getAdvancedConfig())

    const updateControl = (key, value) => {
        const _controls = { ...props.engine.getConfig() }
        const updatedControls = { ..._controls, [key]: { ..._controls[key], value } }
        props.engine.setConfig(updatedControls)
        setControls(updatedControls)
    }

    const updateAdvancedControl = (key, value) => {
        const _controls = { ...props.engine.getAdvancedConfig() }
        const updatedControls = { ..._controls, [key]: { ..._controls[key], value } }
        props.engine.setAdvancedConfig(updatedControls)
        setAdvancedControls(updatedControls)
    }


    const controlElements = Object.keys(controls).map((key, index) => {
        const controlLabel = controlsDictionary[key][props.lang] || `unknown dictionary entry : ${key}`

        return (<RangeInput
            key={key}
            label={controlLabel}
            value={controls[key].value}
            min={controls[key].min}
            max={controls[key].max}
            step={controls[key].step}
            onValueChange={(value) => {
                updateControl(key, value)
            }}
        />)
    })

    const advancedControlElements = Object.keys(advancedControls).map((key, index) => {
        return (<RangeInput
            key={key}
            label={key}
            value={advancedControls[key].value}
            min={advancedControls[key].min}
            max={advancedControls[key].max}
            step={advancedControls[key].step}
            onValueChange={(value) => {
                updateAdvancedControl(key, value)
            }}
        />)
    })


    return (
        <div className="animated-canvas-controls">

            {controlElements}
            {/* --- */}
            {/* {advancedControlElements} */}
        </div>
    )
}


export const AnimatedBackgroundControls = props => {
    const background = useContext(BackgroundContext)

    console.log(background);

    // const [entitiesLimit, setEntitiesLimit] = useState(15)
    // const [decay, setDecay] = useState(0.2)
    // const [size, setSize] = useState(10)
    // const [speed, setSpeed] = useState(.1)
    // const [direction, setDirection] = useState(90)
    // const [growthRate, setGrowthRate] = useState(-0.1)

    if (!background.engine) return null

    if (background.engine.variant === 'dot_engine') {
        return <DotEngineControls engine={background.engine} lang={props.lang} />
    }

    return null
}