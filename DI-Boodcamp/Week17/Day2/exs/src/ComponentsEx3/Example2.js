import React, { useState, useEffect } from 'react';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/data.json') 
      .then(response => response.json())
      .then(data => {
        setExperiences(data.Experiences);
      })
      .catch(error => console.error('Loading data error:', error));
  }, []);

  return (
    <div className="experiences">
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <div key={index} className="experience">
            <div className="company">
              <img 
                src={experience.logo} 
                alt={experience.companyName} 
                className="company-logo" 
              />
              <a href={experience.url} target="_blank" rel="noopener noreferrer">
                <h3>{experience.companyName}</h3>
              </a>
            </div>
            <div className="roles">
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="role">
                  <h4>{role.title}</h4>
                  <p>{role.description}</p>
                  <p><strong>Location:</strong> {role.location}</p>
                  <p><strong>Duration:</strong> {role.startDate} to {role.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading or no experiences available.</p>
      )}
    </div>
  );
};

export default Experiences;