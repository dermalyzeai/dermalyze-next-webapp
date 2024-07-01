// pages/instagram.js
import { useState, useEffect } from 'react';
import fetchInstagramPosts from '../utils/fetchInstagramPosts';
import styles from './instagram.module.css';

const InstagramPage = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN; // Ensure you set this environment variable

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchInstagramPosts(accessToken);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };

    getPosts();
  }, [accessToken]);

  return (
    <div className={styles.container}>
      <h1>Instagram Posts</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <a href={post.permalink} target="_blank" rel="noopener noreferrer">
              <img src={post.media_url} alt={post.caption} className={styles.image} />
              <p className={styles.caption}>{post.caption}</p>
              <p className={styles.date}>{new Date(post.timestamp).toLocaleDateString()}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramPage;
