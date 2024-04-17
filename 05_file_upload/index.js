//app create 
const express = require('express')
const app = express();

//PORT FIND KRRNMA HAI 
require("dotenv").config()
const PORT = process.env.PORT || 4000;

//MIDDLEWARE ADD KRNA HAI 
app.use(express.json());
//dekho json ke sath interact krne ke liye express ke pass capability hia 
//but kya files ke ath interact krne ke liytr kch hia ? nhi so  ab iske liye hme install krna pdega ek external package =>
// express file upload naam se  ya fir ek dusra multer 
const fileupload = require('express-fileupload');
app.use(fileupload( {
    useTempFiles : true,
    tempFileDir : '/tmp/'
    }
   
));




//DB SE CONNECT KRNA HIA ;

const db = require('./config/database') ; 
db.connect();

//CLOUD SE CONNECT KRNA HAI 
const cloudinary  = require("./config/cloudinary") ; 
cloudinary.cloudinaryConnect();
 

//API ROUTE MOUNT KRNA HAI 

const Upload = require ("./routes/FileUpload");
app.use('/api/v1/upload' ,Upload) ; 

//ACTIVATED SERVER

app.listen(PORT,()=>{
    console.log(`APP is running at ${PORT}`)
}); 