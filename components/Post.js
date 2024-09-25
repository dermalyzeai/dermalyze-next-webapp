// components/Post.js

import Link from 'next/link';
import styles from './Post.module.css';

const Post = ({ post }) => {
  return (
    <Link href={`/posts/${post.fields.slug}`} legacyBehavior>
      <a className={styles.postBox}>
        {post.fields.imageUrl && (
          <img src={post.fields.imageUrl} alt={post.fields.title} className={styles.postImage} />
        )}
        <h2>{post.fields.title}</h2>
        <p>{new Date(post.fields.date).toLocaleDateString()}</p>
        <p>{post.fields.description}</p>
      </a>
    </Link>
  );
};

export default Post;
