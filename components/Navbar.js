import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [pages, setPages] = useState([]);
  const [email, setEmail] = useState('');

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
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Dermalyze</a>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.subscriptionForm}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.emailInput}
        />
        <button type="submit" className={styles.subscribeButton}>Subscribe</button>
      </form>
      <ul className={styles.navLinks}>
        {renderMenuItems(pages)}
      </ul>
    </nav>
  );
};

export default Navbar;
