const express = require('express');
const app = express();

//load config from env file 

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middleware to parse json data
app.use(express.json());

//import toutes for TODO API

const todoRoutes = require('./routes/todos');

//mount the todo API routes 
//ye jo /api/v1/todos hai ye hmne isliye likha hai taki hmara api versioning ho jaye
//agr kisi bhi api me kuch changes krna pde toh uska version change kr denge
//aur ye /api/v1/todos ye hmara base url hai usse pehle localhost ayega

app.use('/api/v1/', todoRoutes);

//sbsepehle mera locsal host hai jo 4000 hai vo ayega 4000/firhmara ye api/v1/ uske baad jo todoroutes mehai isme hmar create route hai vo ayega
//toh finally ye hoga localhost:4000/api/v1/createTodo


//start the server
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})



//connect to database 
const dbConnect = require('./config/database');
dbConnect();


//default route

app.get('/', (request, response)=>{
    response.send("<h1>This is a homepage</h1>");
})