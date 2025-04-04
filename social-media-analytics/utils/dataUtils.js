function sortUsersByPostCount(userPostCounts) {
    return Object.entries(userPostCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([user, count]) => ({ user, count }));
}

function sortPostsByComments(postCommentCounts) {
    const maxComments = Math.max(...Object.values(postCommentCounts));
    return Object.keys(postCommentCounts).filter(post => postCommentCounts[post] === maxComments);
}

function sortPostsByTimestamp(posts) {
    return posts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);
}

module.exports = { sortUsersByPostCount, sortPostsByComments, sortPostsByTimestamp };