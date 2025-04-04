const express = require('express');
const { fetchUsers, fetchPosts, fetchComments } = require('../services/apiService');
const { sortUsersByPostCount, sortPostsByComments, sortPostsByTimestamp } = require('../utils/dataUtils');

const router = express.Router();

router.get('/top-users', async (req, res) => {
    const access_token = req.headers.authorization?.split(' ')[1];

    if (!access_token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    try {
        const users = await fetchUsers(access_token);
        const userPostCounts = {};

        await Promise.all(users.map(async (userId) => { 
            const posts = await fetchPosts(userId, access_token);
            userPostCounts[userId] = posts.length;
        }));

        const topUsers = sortUsersByPostCount(userPostCounts);
        res.json({ topUsers });
    } catch (error) {
        console.error('Error in /top-users route:', error.message);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/posts', async (req, res) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    const type = req.query.type || 'latest';

    if (!access_token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    try {
        const users = await fetchUsers(access_token);
        const posts = [];

        await Promise.all(users.map(async (userId) => {
            const userPosts = await fetchPosts(userId, access_token);
            posts.push(...userPosts);
        }));

        if (type === 'latest') {
            const latestPosts = sortPostsByTimestamp(posts);
            res.json({ latestPosts });
        } else if (type === 'popular') {
            const postCommentCounts = {};

            await Promise.all(posts.map(async (post) => {
                const comments = await fetchComments(post.id, access_token);
                postCommentCounts[post.id] = comments.length;
            }));

            const popularPosts = sortPostsByComments(postCommentCounts);
            res.json({ popularPosts });
        } else {
            res.status(400).json({ message: 'Invalid type parameter' });
        }
    } catch (error) {
        console.error('Error in /posts route:', error.message);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/comments/:postId', async (req, res) => {
    const access_token = req.headers.authorization?.split(' ')[1];
    const postId = req.params.postId;

    if (!access_token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    try {
        const comments = await fetchComments(postId, access_token);
        res.json({ comments });
    } catch (error) {
        console.error('Error in /comments route:', error.message);
        res.status(500).json({ message: 'Error fetching comments' });
    }
});

module.exports = router;
