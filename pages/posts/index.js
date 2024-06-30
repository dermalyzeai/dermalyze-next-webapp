// pages/posts/index.js

import Link from 'next/link';
import client from '../../utils/contentfulPosts';
import styles from './posts.module.css';

export default function Posts({ posts }) {
  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: 'center' }}>Posts</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/posts/${post.fields.slug}`}>
          <div key={post.sys.id} className={styles.postBox}>

              <a>{post.fields.title}</a>
          </div>
          </Link>
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
