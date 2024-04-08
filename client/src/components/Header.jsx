import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../assets/coyote.png';
import WhiteLogo from '../assets/coyote-white.png';

export const Header = () => {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleToggleNavMenu = () => {
    setToggleNavMenu((prev) => !prev);
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 975) {
      setToggleNavMenu(false);
    }
  }, [windowWidth]);
  return (
    <header>
      <nav>
        <div className="logo-container">
          <Link to="/">
            <img className="white-logo" src={Logo} alt="coyote-logo-image" />
          </Link>
        </div>

        {!toggleNavMenu && (
          <i className="fa-solid fa-bars" onClick={handleToggleNavMenu}></i>
        )}
        {toggleNavMenu && (
          <div className="mobile-logo-container">
            <Link to="/">
              <img
                className="white-logo"
                src={WhiteLogo}
                alt="coyote-logo-image"
                onClick={handleToggleNavMenu}
              />
            </Link>
            <i className="fa-solid fa-x" onClick={handleToggleNavMenu}></i>
          </div>
        )}

        {/* Nav Menu */}
        {toggleNavMenu && (
          <>
            <motion.ul
              className="nav-menu"
              initial={{ x: -300 }}
              animate={{ x: toggleNavMenu ? 0 : -300 }}
              transition={{ type: 'tween', duration: 0.175, ease: 'linear' }}
            >
              <li>
                <Link to="/" onClick={handleToggleNavMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleToggleNavMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/packages" onClick={handleToggleNavMenu}>
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleToggleNavMenu}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={handleToggleNavMenu}>
                  Event Categories
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleToggleNavMenu}>
                  Contact
                </Link>
              </li>

              <div className="social-media-container">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-solid fa-envelope"></i>
              </div>
            </motion.ul>
          </>
        )}

        {/* Desktop Menu */}
        <div className="desktop-menu-container">
          <ul className="desktop-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/events">Event Categories</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="social-media-container-desktop">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-solid fa-envelope"></i>
          </div>
        </div>
        
      </nav>
    </header>
  );
};