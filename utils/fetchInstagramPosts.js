// utils/fetchInstagramPosts.js
const fetchInstagramPosts = async (accessToken) => {
  const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`);
  const data = await response.json();
  return data.data;
};

export default fetchInstagramPosts;
