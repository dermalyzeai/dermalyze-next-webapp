// pages/index.js (or any other page)
import React, { useEffect, useState } from 'react';
import styles from './instagram.module.css'; // Import CSS module for styling

const InstagramPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/instagramPosts?limit=3`); // Fetch top 3 posts
                if (!response.ok) {
                    throw new Error('Failed to fetch Instagram posts');
                }
                const data = await response.json();
                setPosts(data.data);
            } catch (error) {
                console.error('Error fetching Instagram posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    const navigateCarousel = (postIndex, childIndex) => {
        // Open the post in a new tab or window
        window.open(posts[postIndex].children.data[childIndex].permalink, '_blank');
    };

    return (
        <div className={styles.instagramPosts}>
            <h2 className={styles.instagramTitle}>Top 3 Instagram Posts</h2>
            <div className={styles.postContainer}>
                {posts.map((post, postIndex) => (
                    <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
                        <div className={styles.post}>
                            {post.media_type === 'IMAGE' ? (
                                <img src={post.media_url} alt={post.caption} className={styles.postMedia} />
                            ) : post.media_type === 'VIDEO' ? (
                                <video controls className={styles.postMedia}>
                                    <source src={post.media_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : post.media_type === 'CAROUSEL_ALBUM' ? (
                                <div className={styles.carouselContainer}>
                                    {post.children.data.map((child, childIndex) => (
                                        <div key={child.id} className={styles.carouselItem} onClick={() => navigateCarousel(postIndex, childIndex)}>
                                            {child.media_type === 'IMAGE' ? (
                                                <img src={child.media_url} alt={post.caption} className={styles.carouselImage} />
                                            ) : child.media_type === 'VIDEO' ? (
                                                <video controls className={styles.carouselVideo}>
                                                    <source src={child.media_url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <p className={styles.postCaption}>{post.caption}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default InstagramPosts;
