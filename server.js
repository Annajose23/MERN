const express = require('express');
const app = express();
const connectDB = require('./db');

connectDB();

app.get('/', (req,res) =>res.send('API Running'));
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/post',require('./routes/posts'));

const PORT = process.env.port || 80;
app.listen(PORT, ()=>console.log(`Server started in port ${PORT} `));