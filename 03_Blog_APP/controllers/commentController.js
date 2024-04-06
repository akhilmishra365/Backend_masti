//import comment model
//import post model
const  Comment = require('../models/commentModel');
const Post = require('../models/postModel');

//buisness logic
//hm ni chahte ke main thread b lock ho jaye isi liye async await ka use kr rahe hai



exports.createComment = async (req,res)=>{
    //nya method se koshish kr re .create ke alawa
    try {
        //fetch data from request body 
        const {post,user,body} = req.body;
        //create comment object 

        //const comment = await Comment.create(post , user , body);
        const comment = new Comment ({
            post,
            user,
            body,

        });
        //save the new comment to the database
        const savedComment = await comment.save();
        //jaise hi hmne post save kiya toh us saved comment ki id bn jayegi

//ab ye bhi toh krna hai ki idhr comment kr re ho toh post me bhi comment ka count bdh jaye
 const UpdatedPost = await Post.findByIdAndUpdate(post, {$push : {comment : savedComment._id}},{new:true})
           //above line me hmne post object se uski id nikali ki ye specific id hai aur fir usko update kiya ki usme comment ki id push kr do
           //new:true isliye likha hai ki hme updated post chahiye na ki purani post
           //aur ye $push ek method hai add krne ke liye aur delte krne ke liye $pull hota hai
            
           .populate('comments') //poulate the comments aray with the comment doxument
           .exec(); //execute the query

           res.json({
                
                post: UpdatedPost,
                
           })


    } 
    catch (error) {
        
       return  res.status(500).json({
        error: 'Internal Server Error while creating comment',

            
        })
        
    }
}