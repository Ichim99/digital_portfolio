// IntroSection.js
import React from 'react';
import './IntroSection.css'; 

const IntroSection = () => {
  return (
    <div className="intro-section">
      <div className="intro-text">
        <p>Hi,I am</p>
        <h1>Elon Moschito</h1>
        <p>I'm a digital musk artist.</p>
      </div>
      <div className="intro-image">
        <img src="/elon-musk-cartoon-ai-1.png" alt="Your Name" />
      </div>
    </div>
  );
};

export default IntroSection;
