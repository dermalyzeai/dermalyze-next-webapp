// components/Search.js

import { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search posts..."
        className={styles.searchInput}
        />
    </div>
  );
};

export default Search;
