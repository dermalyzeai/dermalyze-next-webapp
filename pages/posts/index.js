// pages/posts/index.js

import Link from 'next/link';
import styles from './posts.module.css';
import client from '../../utils/contentfulPosts';

export default function Posts({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.sys.id} className={styles.postBox}>
            <Link href={`/posts/${post.fields.slug}`}>
              <a>
                {post.fields.imageUrl && (
                  <img src={post.fields.imageUrl} alt={post.fields.title} className={styles.postImage} />
                )}
                <h2>{post.fields.title}</h2>
                <p>{new Date(post.fields.date).toLocaleDateString()}</p>
                <p>{post.fields.description}</p>
              </a>
            </Link>
          </div>
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
