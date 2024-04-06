const mongoose = require('mongoose');

//cosnt router 

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    //likes toh multiple ho skte hai isliye array me store kr rahe hai
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    //comments toh multiple ho skte hai isliye array me store kr rahe hai
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
    
})

module.exports = mongoose.model('Post',postSchema) //Post model ka naam hai jo ki postSchema ke basis pe bna hai

