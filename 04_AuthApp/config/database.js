const mongoose = require('mongoose')
require('dotenv').config()


exports.connect = ()=>{ 
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB connected Successfully")

    })
    .catch((err)=>{
        console.log("DB Connection issues")
        console.error(err)
        process.exit(1);
    })
}