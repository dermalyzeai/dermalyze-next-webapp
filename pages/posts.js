// pages/posts.js
import Masonry from 'react-masonry-css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
      );

      const { data: frontmatter, content } = matter(markdownWithMeta);
      const mdxSource = await serialize(content);

      return {
        frontmatter,
        content: mdxSource,
      };
    })
  );

  return {
    props: {
      posts,
    },
  };
}

export default Posts;

const Posts = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((post, index) => (
        <div key={index} className="post-box">
          <h2>{post.frontmatter.title}</h2>
          <MDXRemote {...post.content} />
        </div>
      ))}
    </Masonry>
  );
};


