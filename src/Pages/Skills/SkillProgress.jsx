const SkillProgress = props => {

    const progress = new Array(props.maxScore || 5).fill('off')

    if (props.score <= props.maxScore) {
        for (let i = 0; i < props.score; i++)
            progress[i] = 'on'
    }

    return (
        <div className='skill-progress-container fade-in'>
            <p className="skill-progress-label">{props.label}</p>
            <div className="skill-progress ">
                {progress.map((p, i) => <div key={i} className={p} />)}
            </div>
        </div>
    );
}

export default SkillProgress;