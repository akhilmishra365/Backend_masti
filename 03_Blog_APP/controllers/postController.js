const Post = require('../models/postModel')



exports.createPost = async(req, res) =>{
    try {
        const {title , body } = req.body;

//        const post = await Post.create({title , body});
        const post  = new Post({
            title,
            body
        })
        const savedPost = await post.save();
        res.status(200).json({
            success: true,
            post: savedPost,
            message: "Post Created Successfully"
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
        
    }
};


exports.getAllPosts = async(req,res)=>{
    try {
        //agr sirf find likhenge toh Posts me jo commmnets vgerah hai sirf unki id ayegi isi liye usko populate kr denge.
        const posts = await Post.find().populate("comment").exec();
        res.json({
            
            posts,
           
        })
    } 
    catch (error) {
       return res.status(500).json({
        error:"error wehile posts"
       })
        
        
    }
}