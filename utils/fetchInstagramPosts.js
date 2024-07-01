// utils/fetchInstagramPosts.js
const fetch = require('node-fetch');

const fetchInstagramPosts = async (accessToken) => {
  try {
    const response = await fetch(
      `hhttps://graph.instagram.com/me/media?access_token=${accessToken}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error fetching Instagram posts:', errorText);
      throw new Error('Error fetching Instagram posts');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log('Fetch error:', error);
    throw error;
  }
};

module.exports = fetchInstagramPosts;
