const express = require('express');
const app = express();

app.get('/', (req,res) =>res.send('API Running'));

const PORT = process.env.port || 80;
app.listen(PORT, ()=>console.log(`Server started in port ${PORT} `));