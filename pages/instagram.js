// pages/index.js (or any other page)
import React, { useEffect, useState, useRef } from 'react';
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

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -scrollRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles.instagramPosts}>
            <h2 className={styles.instagramTitle}>Top 3 Instagram Posts</h2>
            <div className={styles.postContainer}>
                {posts.map((post, postIndex) => (
                    <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
                        <div className={styles.post}>
                            {post.media_type === 'IMAGE' || post.media_type === 'VIDEO' ? (
                                <div className={styles.mediaContainer}>
                                    {post.media_type === 'IMAGE' && (
                                        <img src={post.media_url} alt={post.caption} className={styles.postMedia} />
                                    )}
                                    {post.media_type === 'VIDEO' && (
                                        <video controls className={styles.postMedia}>
                                            <source src={post.media_url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ) : post.media_type === 'CAROUSEL_ALBUM' && (
                                <div className={styles.carouselContainer}>
                                    <button className={styles.carouselButton} onClick={scrollLeft}>{'<'}</button>
                                    <div className={styles.carouselList} ref={scrollRef}>
                                        {post.children.data.map((child, childIndex) => (
                                            <div key={child.id} className={styles.carouselItem}>
                                                {child.media_type === 'IMAGE' && (
                                                    <img src={child.media_url} alt={post.caption} className={styles.carouselImage} />
                                                )}
                                                {child.media_type === 'VIDEO' && (
                                                    <video controls className={styles.carouselVideo}>
                                                        <source src={child.media_url} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button className={styles.carouselButton} onClick={scrollRight}>{'>'}</button>
                                </div>
                            )}
                            <p className={styles.postCaption}>{post.caption}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default InstagramPosts;
