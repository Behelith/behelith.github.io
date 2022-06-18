const SkillProgress = props => {
    let maxScore = props.maxScore || 5

    const progress = [
        ...new Array(props.score).fill(true),
        ...new Array(maxScore - props.score).fill(false)
    ]

    return (
        <div className='skill-progress fade-in'>
            <p className="skill-progress__label">{props.label}</p>
            <div className="skill-progress__grid ">{
                progress.map((p, i) => {
                    const classes = ['skill-progress__grid__item']
                    if (p) classes.push('skill-progress__grid__item--active')
                    return <div key={i} className={classes.join(' ')} />
                })
            }</div>
        </div>
    );
}

export default SkillProgress;