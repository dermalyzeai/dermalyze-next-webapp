// pages/api/instagramPosts.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { INSTAGRAM_ACCESS_TOKEN } = process.env;
    const postsApiUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp,children{media_type,media_url}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const profileApiUrl = `https://graph.instagram.com/me?fields=id,username,profile_picture_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    try {
        const [postsResponse, profileResponse] = await Promise.all([
            fetch(postsApiUrl),
            fetch(profileApiUrl)
        ]);

        if (!postsResponse.ok || !profileResponse.ok) {
            throw new Error('Failed to fetch Instagram data');
        }

        const postsData = await postsResponse.json();
        const profileData = await profileResponse.json();

        res.status(200).json({ posts: postsData.data, profile: profileData });
    } catch (error) {
        console.error('Error fetching Instagram data:', error.message);
        res.status(500).json({ error: 'Failed to fetch Instagram data' });
    }
}
