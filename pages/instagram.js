// pages/index.js
import React, { useEffect, useState, useRef } from 'react';
import styles from './instagram.module.css';

const InstagramPosts = () => {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchInstagramData = async () => {
            try {
                const response = await fetch(`/api/instagramPosts`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Instagram data');
                }
                const data = await response.json();
                setPosts(data.posts.slice(0, 3)); // Limit to top 3 posts
                setProfile(data.profile);
            } catch (error) {
                console.error('Error fetching Instagram data:', error.message);
            }
        };

        fetchInstagramData();
    }, []);

    const cleanCaption = (caption) => {
        return caption ? caption.replace(/#\w+\s?/g, '').trim() : '';
    };

    const scrollRef = useRef([]);

    const scrollLeft = (index) => {
        if (scrollRef.current[index]) {
            const currentScrollPosition = scrollRef.current[index].scrollLeft;
            const itemWidth = scrollRef.current[index].offsetWidth;
            scrollRef.current[index].scrollBy({
                left: -itemWidth,
                behavior: 'smooth'
            });

            setTimeout(() => {
                const newScrollPosition = scrollRef.current[index].scrollLeft;
                if (currentScrollPosition === newScrollPosition) {
                    scrollRef.current[index].scrollLeft = 0;
                }
            }, 500);
        }
    };

    const scrollRight = (index) => {
        if (scrollRef.current[index]) {
            const currentScrollPosition = scrollRef.current[index].scrollLeft;
            const itemWidth = scrollRef.current[index].offsetWidth;
            const maxScrollLeft = scrollRef.current[index].scrollWidth - itemWidth;

            scrollRef.current[index].scrollBy({
                left: itemWidth,
                behavior: 'smooth'
            });

            setTimeout(() => {
                const newScrollPosition = scrollRef.current[index].scrollLeft;
                if (currentScrollPosition === newScrollPosition) {
                    scrollRef.current[index].scrollLeft = maxScrollLeft;
                }
            }, 500);
        }
    };

    return (
        <div className={styles.instagramPosts}>
            <h2 className={styles.instagramTitle}>Top 3 Instagram Posts</h2>
            <div className={styles.postContainer}>
                {posts.map((post, postIndex) => (
                    <a key={post.id} href={`https://www.instagram.com/p/${post.id}`} target="_blank" rel="noopener noreferrer" className={styles.postLink}>
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
                                    <button className={styles.carouselButton} onClick={() => scrollLeft(postIndex)}>{'<'}</button>
                                    <div className={styles.carouselList} ref={(el) => scrollRef.current[postIndex] = el}>
                                        {post.children.data.map((child) => (
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
                                    <button className={styles.carouselButton} onClick={() => scrollRight(postIndex)}>{'>'}</button>
                                </div>
                            )}
                            <p className={styles.postCaption}>{cleanCaption(post.caption)}</p>
                        </div>
                    </a>
                ))}
            </div>
            {profile && (
                <div className={styles.profileSection}>
                    <img src={profile.profile_picture_url} alt={profile.username} className={styles.profilePicture} />
                    <div className={styles.profileInfo}>
                        <h3>{profile.username}</h3>
                        <a href={`https://www.instagram.com/${profile.username}`} target="_blank" rel="noopener noreferrer" className={styles.followLink}>Follow me on Instagram</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstagramPosts;
