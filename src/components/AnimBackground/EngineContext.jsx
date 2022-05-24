import { createContext, useContext, useEffect, useRef, useState } from "react";
import RangeInput from "../Inputs/RangeInput";
import DotEngine from "./DotEngine/DotEngine";


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
    const updateRef = useRef()
    const ctxRef = useRef(null)
    const nowRef = useRef(new Date().getTime())
    // const deltaRef = useRef(0)



    useEffect(() => {
        if (!engineRef.current) return
        // let _context = canvasRef.current.getContext('2d')
        if (engineRef.current)
            ctxRef.current = canvasRef.current.getContext('2d')
        updateCanvas(canvasRef.current)


        const update = () => {
            if (!engineRef.current) return
            let then = nowRef.current
            nowRef.current = new Date().getTime()
            let delta = nowRef.current - then
            // deltaRef = nowRef.current - then

            updateCanvas(canvasRef.current)
            engineRef.current.update(canvasRef.current, delta)
            engineRef.current.draw(ctxRef.current)
            updateRef.current = requestAnimationFrame(update)
        }

        updateRef.current = requestAnimationFrame(update)

        return () => {
            cancelAnimationFrame(update)
        }

    }, [])

    return (<BackgroundContext.Provider value={{
        canvas,
        // canvas: canvasRef.current,
        engine: engineRef.current
    }}>
        {props.children}
    </BackgroundContext.Provider>)
};

export const AnimatedBackground = props => {
    const background = useContext(BackgroundContext)
    return background.canvas
}

export const AnimatedBackgroundControls = props => {
    const background = useContext(BackgroundContext)

    const [entitiesLimit, setEntitiesLimit] = useState(15)
    const [decay, setDecay] = useState(0.2)
    const [size, setSize] = useState(10)
    const [speed, setSpeed] = useState(.1)
    const [direction, setDirection] = useState(90)
    const [growthRate, setGrowthRate] = useState(-0.1)

    const [controls, setControls] = useState(background.engine.getConfig())
    const [advancedControls, setAdvancedControls] = useState(background.engine.getAdvancedConfig())

    const updateControl = (key, value) => {
        const _controls = { ...background.engine.getConfig() }
        const updatedControls = { ..._controls, [key]: { ..._controls[key], value } }
        background.engine.setConfig(updatedControls)
        setControls(updatedControls)
    }

    const updateAdvancedControl = (key, value) => {
        const _controls = { ...background.engine.getAdvancedConfig() }
        const updatedControls = { ..._controls, [key]: { ..._controls[key], value } }
        background.engine.setAdvancedConfig(updatedControls)
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

    const inputs = (<>
        <RangeInput min={0} max={50} step={1} label='Particle count'
            value={entitiesLimit}
            onValueChange={(value) => {
                setEntitiesLimit(value)
                background.engine.setEntitiesLimit(value)
            }}
        />

        <RangeInput min={0.1} max={2} step={0.01} label='Particle decay'
            value={decay}
            onValueChange={(value) => {
                setDecay(value)
                background.engine.setDecay(value)
            }}
        />

        <RangeInput min={5} max={50} step={1} label='Particle size'
            value={size}
            onValueChange={(value) => {
                setSize(value)
                background.engine.setSize(value)
            }}
        />

        <RangeInput min={0} max={2.5} step={.01} label='Particle speed'
            value={speed}
            onValueChange={(value) => {
                setSpeed(value)
                background.engine.setSpeed(value)
            }}
        />

        <RangeInput min={0} max={360} step={5} label='Particle direction'
            value={direction}
            onValueChange={(value) => {
                setDirection(value)
                background.engine.setDirection(value)
            }}

        />

        <RangeInput min={-0.5} max={0.5} step={0.1} label='Particle growth rate'
            value={growthRate}
            onValueChange={(value) => {
                setGrowthRate(value)
                background.engine.setGrowthRate(value)
            }}
        />
    </>)

    return (
        <div className="animated-canvas-controls">
            {controlElements}
            {/* --- */}
            {/* {advancedControlElements} */}
        </div>
    )
}