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
app.use('/api/blog-posts', BlogPostRoutes)
const PORT = process.env.PORT || 10000;

db().then(()=>{app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})});
