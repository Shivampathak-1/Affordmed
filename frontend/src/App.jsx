import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';

const App = () => {
    return (
        <Router>
            <div className="p-4">
                <nav className="mb-4">
                    <Link to="/top-users" className="mr-4">Top Users</Link>
                    <Link to="/trending-posts" className="mr-4">Trending Posts</Link>
                    <Link to="/feed">Feed</Link>
                </nav>
                <Routes>
                    <Route path="/top-users" element={<TopUsers />} />
                    <Route path="/trending-posts" element={<TrendingPosts />} />
                    <Route path="/feed" element={<Feed />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
