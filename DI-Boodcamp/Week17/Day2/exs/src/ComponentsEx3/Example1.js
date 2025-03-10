import React, { useState, useEffect } from 'react';

const SocialMedias = () => {
  const [socialMedias, setSocialMedias] = useState([]);

  useEffect(() => {
    
    fetch('/data.json') 
      .then(response => response.json())
      .then(data => {
        
        setSocialMedias(data.SocialMedias);
      })
      .catch(error => console.error('Loading data error:', error));
  }, []);

  return (
    <div className="social-media-links">
      {socialMedias.length > 0 ? (
        // Рендерим список ссылок
        socialMedias.map((link, index) => (
          <div key={index} className="social-media">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </div>
        ))
      ) : (
        // Если нет ссылок
        <p>Нет доступных социальных сетей.</p>
      )}
    </div>
  );
};

export default SocialMedias;