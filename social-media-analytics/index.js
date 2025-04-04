const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
const analyticsRoutes = require('./routes/analyticsRoutes');

const PORT = 3000;

app.use(express.json());

app.use('/api', analyticsRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});