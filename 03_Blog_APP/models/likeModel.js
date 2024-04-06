const mongoose = require('mongoose');

//writing the Route handler 

const likeSchema = new mongoose.Schema({
    //konsi  post ko like kiya hai
    
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },

    //kis user ne like kiya hai
    user:{
        type:String,
        required:true,  
    }
})

module.exports = mongoose.model('Like',likeSchema) //Like model ka naam hai jo kie likeschema ke basis pe bna hai