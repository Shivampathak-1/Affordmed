import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts', {
                    headers: { 'Authorization': `Bearer YOUR_ACCESS_TOKEN` }
                });
                setPosts(response.data.latestPosts);
            } catch (error) {
                console.error('Error fetching latest posts:', error);
            }
        };
        fetchLatestPosts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Feed</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="mb-2 p-2 bg-gray-100 rounded">
                        {post.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feed;
