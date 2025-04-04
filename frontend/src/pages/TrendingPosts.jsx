import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts', {
                    headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN` }
                });
                setPosts(response.data.popularPosts);
            } catch (error) {
                console.error('Error fetching trending posts:', error);
            }
        };
        fetchTrendingPosts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="mb-2 p-2 bg-gray-100 rounded">
                        Post ID: {post} - Comments Count: {post.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingPosts;
