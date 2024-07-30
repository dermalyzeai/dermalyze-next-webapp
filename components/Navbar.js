import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [pages, setPages] = useState([]);
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/pages.json')
      .then(response => response.json())
      .then(data => setPages(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formUrl = 'actionURL';
    const entryField = 'id';
    const formData = new FormData();
    formData.append(entryField, email);

    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    }).then(() => {
      alert('Thanks for subscribing!');
      setEmail('');
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.test) {
        return null;
      }
      if (item.children) {
        return (
          <li key={index} className={styles.dropdown}>
            <span className={styles.dropbtn}>{item.label}</span>
            <ul className={styles.dropdownContent}>
              {renderMenuItems(item.children)}
            </ul>
          </li>
        );
      }
      return (
        <li key={index}>
          <Link href={item.path}>
            <a>{item.label}</a>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg rounded-3 bg-dark navbar-dark">
        <a className="navbar-brand px-3" href="/">
        
          <img className="rounded-2"src="https://cyberneel.github.io/img/CyberNeelLogoNewOutfit1080p-1400x1400.webp" alt="" width="30" height="30" alt=""></img>
        
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
