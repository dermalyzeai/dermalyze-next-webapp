// pages/api/instagramPosts.js
import fetchInstagramPosts from '../../utils/fetchInstagramPosts';

export default async function handler(req, res) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Store your access token in an environment variable
  const posts = await fetchInstagramPosts(accessToken);
  res.status(200).json(posts);
}
