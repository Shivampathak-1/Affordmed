const express = require('express');
const app = express();

const analyticsRoutes = require('./routes/analyticsRoutes');

const PORT = 3000;

app.use(express.json());

app.use('/api', analyticsRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
});