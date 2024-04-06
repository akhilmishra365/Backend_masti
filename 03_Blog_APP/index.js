const express = require('express');
const app = express();
require('dotenv').config();



const PORT = process.env.PORT || 4000;

app.use(express.json());

const routes  =  require('./route/blogRoutes');

app.use('/api/v1/', routes);


app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();


app.get('/', (request, response)=>{
    response.send("<h1>This is a homepage</h1>");
})