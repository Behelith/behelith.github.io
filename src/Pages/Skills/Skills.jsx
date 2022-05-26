import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import SkillProgress from "./SkillProgress";

const Skills = props => {
    const langContext = useContext(LangContext)

    const skillsGrid = <div className="skill-progress-grid">
        <SkillProgress label='HTML' score={4} maxScore={5} />
        <SkillProgress label='CSS' score={4} maxScore={5} />
        <SkillProgress label='SASS' score={3} maxScore={5} />
        <SkillProgress label='JavaScript' score={4} maxScore={5} />
        <SkillProgress label='React' score={3} maxScore={5} />
        <SkillProgress label='Node.js' score={2} maxScore={5} />
        <SkillProgress label='Rest api' score={4} maxScore={5} />
        <SkillProgress label='Illustrator' score={4} maxScore={5} />
        <SkillProgress label='Photoshop' score={4} maxScore={5} />
        {/* <SkillProgress label='After Effects' score={2} maxScore={5} /> */}
    </div>

    if (langContext.lang == 'pl') return (
        <div className='fade-in'>
            <p className="page-watermark">Umiejętności</p>
            <p className="page-label">Nabyte umiejętności</p>

            <p className="page-text">Jeśli ciekawi Cię, czym się (mniej więcej) zajmuję to poniżej znajduje się lista językow, frameworków i programów, z którymi przyszło mi pracować</p>

            {skillsGrid}
        </div>
    );

    return (
        <div className='fade-in'>
            <p className="page-watermark">Skills</p>
            <p className="page-label">Acquired skills</p>

            <p className="page-text">If you're curious what I am capable of (more or less), here is list of languages, frameworks and programs I worked with</p>

            {skillsGrid}
        </div>
    );
}

export default Skills;