const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const db = require('./db');

app.use(cors());
//Routes
const BlogPostRoutes = require('./routes/blogPostRoutes');
// Connect to the database


app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    },
    limit: '50mb',
}));

app.get('/api/config/emailjs', (req, res)=>{
    res.send({
        template_id: process.env.TEMPLATE_ID,
        service_id: process.env.SERVICE_ID,
        public_key: process.env.PUBLIC_KEY,
    })
})

app.use('/api/blog-posts', BlogPostRoutes)
const PORT = process.env.PORT || 10000;

db().then(()=>{app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})});
