// pages/posts/[slug].js

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '../../utils/contentfulPosts';
import styles from './post.module.css';

export default function Post({ post }) {
  const { title, date, description, content, imageUrl } = post.fields;

  return (
    <div className={styles.postContainer}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.postImage} />}
      <h1 className={styles.postTitle}>{title}</h1>
      <p className={styles.postDate}>{new Date(date).toLocaleDateString()}</p>
      <p className={styles.postDescription}>{description}</p>
      <div className={styles.postContent}>
        {documentToReactComponents(content)}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'dermalyzePosts',
  });

  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const response = await client.getEntries({
    content_type: 'dermalyzePosts',
    'fields.slug': slug,
  });

  return {
    props: {
      post: response.items[0],
    },
  };
}
