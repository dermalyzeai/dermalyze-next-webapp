// pages/posts/index.js

import { useState } from 'react';
import client from '../../utils/contentfulPosts';
import Search from '../../components/Search';
import Post from '../../components/Post';
import styles from './posts.module.css';

export default function Posts({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (query) => {
    const filtered = posts.filter((post) =>
      post.fields.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <Search onSearch={handleSearch} />
      <div className={styles.grid}>
        {filteredPosts.map((post) => (
          <Post key={post.sys.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await client.getEntries({
    content_type: 'dermalyzePosts', // Replace with your content type ID
    order: '-fields.date', // Example ordering by date
  });

  return {
    props: {
      posts: response.items,
    },
  };
}
