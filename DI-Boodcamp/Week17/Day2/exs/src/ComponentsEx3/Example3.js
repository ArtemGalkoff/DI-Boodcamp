import React, { useState, useEffect } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('/data.json') 
      .then(response => response.json())
      .then(data => {
        setSkills(data.Skills); 
      })
      .catch(error => console.error('Loading data error:', error)); 
  }, []);

  return (
    <div className="skills">
      {skills.length > 0 ? (
        skills.map((skillArea, areaIndex) => (
          <div key={areaIndex} className="skill-area">
            <h3>{skillArea.Area}</h3> 
            <div className="skillset">
              {skillArea.SkillSet.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill">
                  <h4>{skill.Name}</h4> 
                  <p><strong>Status:</strong> {skill.Hot ? "Hot" : "Not Hot"}</p> 
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading or no skills available.</p>  
      )}
    </div>
  );
};

export default Skills;