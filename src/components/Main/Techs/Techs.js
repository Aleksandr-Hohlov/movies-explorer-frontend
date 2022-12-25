import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title about-project__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__blocks">
          <li className="techs__blocks-element">HTML</li>
          <li className="techs__blocks-element">CSS</li>
          <li className="techs__blocks-element">JS</li>
          <li className="techs__blocks-element">React</li>
          <li className="techs__blocks-element">Git</li>
          <li className="techs__blocks-element">Express.js</li>
          <li className="techs__blocks-element">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
