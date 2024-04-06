



//Server Instantiate
const express = require('express');
const app = express();


/**
 *  refers to the process of breaking down and analyzing a string of text or code, in order to understand its grammatical structure and extract meaningful information from it
 */

//used to parse req.body in express ==> pUT or Post 
const bodyParser = require('body-parser');

//specifically parse json.data & add it to the request.Body object 

app.use(bodyParser.json());

//assigning the port to my server
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})

//Creating routes for the server

app.get('/', (req,res)=>{

    res.send('Hello World')
})

app.post('/api/cars', (req,res)=>{
    const {name,brand} = req.body;
    console.log(name,brand)
    res.send('Car added successfully')
    
})


//CONNECTING our express and mongoDB using mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDataBase')
.then(()=>{
    console.log('Connected to MongoDB')

})
.catch((err)=>{
    console.log('Error connecting to MongoDB', err)
})