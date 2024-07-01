// pages/api/instagramPosts.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { INSTAGRAM_ACCESS_TOKEN } = process.env;
    const limit = req.query.limit || 3; // Default limit is 3, can be overridden in query

    const apiUrl = `https://graph.instagram.com/v12.0/me/media?fields=id,media_type,media_url,thumbnail_url,children{media_url,media_type},caption,timestamp&limit=${limit}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram posts');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch Instagram posts' });
    }
}
