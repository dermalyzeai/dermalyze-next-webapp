// pages/posts/index.js

import Link from 'next/link';
import client from '../../utils/contentfulPosts';

export default function Posts({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <Link href={`/posts/${post.fields.slug}`}>
              <a>{post.fields.title}</a>
            </Link>
          </li>
        ))}
      </ul>
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
