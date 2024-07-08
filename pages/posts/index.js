// pages/posts/index.js

import { useState } from 'react';
import Post from '../../components/Post';
import styles from './posts.module.css';
import client from '../../utils/contentfulPosts';

export default function Posts({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchBox}
      />
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
    content_type: 'dermalyzePosts',
    order: '-fields.date',
  });

  return {
    props: {
      posts: response.items,
    },
  };
}
