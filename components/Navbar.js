import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch('/pages.json')
      .then(response => response.json())
      .then(data => setPages(data));
  }, []);

  const renderMenuItems = (items, drop=false) => {
    return items.map((item, index) => {
      if (item.test) {
        return null;
      }
      if (item.children) {
        return (
          <li className="ps-3 nav-item dropdown bg-dark" key={index}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                key = {index}
              >
                {item.label}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {renderMenuItems(item.children,true)}
              </ul>
            </li>
        );
      }
      
      if (drop == true) {
        return (
          <li key = {index}><a className={styles.navItem + " ps-3 dropdown-item rounded-3"} href={item.path}>{item.label}</a></li>
        );
      }
      
      return (
        <li key={index} className=' ps-3 nav-item'>
            <a className={styles.navItem + ' nav-link rounded-3'} href={item.path}>{item.label}</a>
        </li>
      );
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg rounded-3 bg-dark navbar-dark">
        <a className="navbar-brand px-3" href="/">
        
          <img className="rounded-2"src="https://cyberneel.github.io/img/CyberNeelLogoNewOutfit1080p-1400x1400.webp" alt="" width="30" height="30" ></img>
        
        &nbsp;&nbsp;Dermalyze
        
        </a>
        <button
          className="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {renderMenuItems(pages)}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
