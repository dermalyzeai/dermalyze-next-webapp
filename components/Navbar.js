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

  const renderMenuItems = (items) => {
    return items.map((item, index) => {
      if (item.test) {
        return;
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
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Dermalyze</a>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        {renderMenuItems(pages)}
      </ul>
    </nav>
  );
};

export default Navbar;
