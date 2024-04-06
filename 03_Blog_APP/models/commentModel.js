//?HMARE COMMENT KE ANDR 3 CHISE HINGI 
//!kis post pe comment kiya 
//kis user ne kiya hai 
//comment kya hai




//import mongoose
const mongoose = require('mongoose');

//route handler 

const commentSchema = new mongoose.Schema({
    //konsi post pe comment kr re ho 
    post:{
        //jb bhi ap kisi aur moderkl ko refer kre to hme aise likhna hoga
        type: mongoose.Schema.Types.ObjectId,
        //ye post ek prakar ki id store kr ra hoga aur refrence btayega ki kiski id store kr ra hoga

        ref : "Post", //refrence to the post model

    },
    //kis user ne kiya hai
    user:{
        type:String,
        required:true,
    },
    //comment kya hai
    body:{
        type:String,
        required:true,
    }
})


//export 
module.exports = mongoose.model('Comment',commentSchema) //ye comment model hai jo ki commentSchema ke basis pe bna hai