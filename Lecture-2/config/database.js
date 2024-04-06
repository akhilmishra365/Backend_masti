
//this file will ensure that we are connected to the database


const mongoose = require('mongoose');
//this function will establish connection to database

//INSTALL .ENV LIBRARY TAAKI HM PROCESS.ENV WALA KAAM KR SKE NPM I DOTENV
require('dotenv').config() //is statement se jo bhi hmne .env me define kiya hia vo load ho jaye process object ke andr 


const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

.then(()=>{
    console.log('Connection to database established')
})
.catch((err)=>{
    console.log('Connection to database failed')
    console.log(err)
    process.exit(1);
})


}
module.exports = dbConnect;


