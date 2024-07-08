// components/Post.js

import Link from 'next/link';
import styles from './Post.module.css';

const Post = ({ post }) => {
  return (
    <div key={post.sys.id} className={styles.postBox}>
      <Link href={`/posts/${post.fields.slug}`}>
        <a>
          {post.fields.imageUrl && (
            <img src={post.fields.imageUrl} alt={post.fields.title} className={styles.postImage} />
          )}
          <h2 className={styles.postTitle}>{post.fields.title}</h2>
          <p className={styles.postDate}>{new Date(post.fields.date).toLocaleDateString()}</p>
          <p className={styles.postDescription}>{post.fields.description}</p>
        </a>
      </Link>
    </div>
  );
};

export default Post;
