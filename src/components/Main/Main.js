import React from 'react';
import './Main.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Header from './Header/Header';
import Footer from './Footer/Footer';

function Main() {
  return (
    <div className="main">
      <Header />
      <main className="main__content">
        <Promo />
        <NavTab />
        <div className="main__project">
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Main;
