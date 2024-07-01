import fetchInstagramPosts from '../../utils/fetchInstagramPosts';

export default async function handler(req, res) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Store your access token in an environment variable
    const posts = await fetchInstagramPosts(accessToken);
    res.status(200).json(posts);
  } catch (error) {
    console.error('API route error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}
