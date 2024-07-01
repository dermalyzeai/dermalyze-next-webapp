// utils/fetchInstagramPosts.js
const fetch = require('node-fetch');

const fetchInstagramPosts = async (accessToken) => {
  try {
    const response = await fetch(
      `hhttps://graph.instagram.com/v18.0/6948265175253817/media?access_token=${accessToken}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching Instagram posts:', errorText);
      throw new Error('Error fetching Instagram posts');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

module.exports = fetchInstagramPosts;
