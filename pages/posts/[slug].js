// pages/posts/[slug].js

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '../../utils/contentfulPosts';

export default function Post({ post }) {
  const { title, content } = post.fields;

  return (
    <div>
      <h1>{title}</h1>
      <div>{documentToReactComponents(content)}</div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await client.getEntries({
    content_type: 'dermalyzePosts', // Replace with your content type ID
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
    content_type: 'dermalyzePosts', // Replace with your content type ID
    'fields.slug': slug,
  });

  return {
    props: {
      post: response.items[0],
    },
  };
}
