
const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
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