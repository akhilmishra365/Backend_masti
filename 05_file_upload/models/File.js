const { configDotenv } = require("dotenv");
const mongoose = require ("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String 

    },
    tags:{
        type : String
    }, 
    email:{
        type : String 
    }

}) ; 


//Post middleware and pre middleware of mongoose is used to send mails read about them  in mongoose documentation 
//aur ye middle ware mongoose . model wali line ke uor hi likhni horu hia 

//now ww will use post hook 
//dekho jo bhi mera schema hai uske upr hmne post middle ware apply kiy ahi konse operation pr ? save pe 

//jo bhi entry hmare database me hui hai usi ko hm doc bolre hain 

fileSchema.post("save" , async function(doc){
    try {
        console.log("DOC" , doc);

        //create a treansporter using nodemaikler
        let transporter = nodemailer.transporter({
            host : process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        })

//sending mails 

let info = await transporter.sendMail({
    from:"akhilmishra",
    to:doc.email,
    subject:"NEW file uploaded ",
    html: "<h2> hello ji </h2> <p>FILE UPLOADED</p>"
})

console.log(info) ; 



    } catch (error) {
        console.error(error)
        
    }

})



const File = mongoose.model("File" , fileSchema);
module.exports = File ; 