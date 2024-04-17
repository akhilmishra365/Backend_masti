/*
 * A middleware is a function that sits between the client and the server in a web application.
 * It intercepts and handles HTTP requests and responses. Middleware functions can perform tasks such as authentication, logging, error handling, and more. 
 * They provide a way to modularize and reuse common functionality across different routes or endpoints in an application.
 */

//dekho hme chahiye jo student hai vo student hi access kr paye 
//jo admin hai vo admin hi access kr paye 

//uske liye beech me middle ware pel denge ki han bhai ye hai aise hai ;


//AUTH,ISSTUDENT,ISAdmin ye 3 middleware bnenge bnayenge

const jwt = require("jsonwebtoken");

require("dotenv").config();

//bro uisme 3 parameter pass hue hai aur ye syntax hainnext is liye taki aap next middleware pe jaa sko
//this middle ware takes care of authenticcation
exports.auth = (req,res,next)=>{
    try {
        //!todo   otherways to fetch token 
        const token = req.body.token;
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token  .verify method
        try {
            //isse hme ek payload milega verify hoke;
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
//jo bhi aya usi ko request ke sath bhej diya wapis;kyunki aage jaake hm ye bhi toh check krenge ki ye user hai ki ni ?
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                 success:false,
                 message:"tpken ixs invalid chutiyeee"

            })
            
        }
        //taki next wale middle ware me chla jaaye;
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong,while verifying the token",

        })
        
    }
}

//this midlle verification is authorization

exports.isStudent = (req,res,next)=>{
    try {
        if(req.user.role !=="student")
        {
            return res.status(401).json({
                success:false,
                message:'this is a protected route for students'
            }) ; 
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'user role not verified'
        }) ; 
        
    }
}
exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role !=="student")
        {
            return res.status(401).json({
                success:false,
                message:'this is a protected route for Admin'
            }) ; 
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'user role not verified'
        }) ; 
        
    }
}