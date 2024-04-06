const Post = require("../models/postModel")
const Like = require("../models/likeModel")


//like a post 

//like ka object bna ke save krlo 
//jo bhi like kiya hai uski id ne=ikal ke post me push krdo 


exports.likePost = async (req,res) =>
{try {
    const {post,user} = req.body;
    //const like = await Like.create()
    const like = new Like({
        post,user
    })
    //like ko db me push krdo 
    const savedLikes =  await like.save()
    //now update our post collection based on this

    const updatedpost = await Post.findByIdAndUpdate(post,{$push: {likes:savedLikes._id}},{new:true})
    console.log(type(post))

    res.status(200).json({
        success : true,
        post: updatedpost,
        message: "liked successfully "


    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        data:"internal server error",
        message:error.message
        
    })
    
}
    

};


exports.unlikePost = async (req,res)=>{
    try {

        const {post,like} = req.body
        //find and delete the like collections me se 
        const deletedLike = await Like.findOneAndDelete({
            post:post , _id:like


        })
        //UPDATE TEH POST COILLECTION
        const updatedPost = await Post.findByIdAndDelete(post,{$pull:{likes:deletedLike._id}},{new:true}) //likes ke andr jiski id deltedlike_id ho usko del  rna hai

        res.json({
            post:updatedPost,
        });
        
    } catch (error) {
        return  res.status(400).json({
            errpr:"Error while unliking post"
        })
        
    }
    
}


