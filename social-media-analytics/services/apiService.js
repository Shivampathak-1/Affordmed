const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service';

async function fetchUsers(access_token) {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (response.data && response.data.users) {
            return Object.keys(response.data.users); 
        } else {
            throw new Error('Invalid response structure from users endpoint');
        }
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error; 
    }
}

async function fetchPosts(userId, access_token) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response.data.posts || [];
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error.message);
        throw error;
    }
}

async function fetchComments(postId, access_token) {
    try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return response.data.comments || [];
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error.message);
        throw error;
    }
}

module.exports = { fetchUsers, fetchPosts, fetchComments };
