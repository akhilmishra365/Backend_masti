const File = require("../models/File") ; 

//localfileupload -> handler function 

//ye function client ke ek path se media fetch krta hai aur server ke ek path pe rkh deta hai 

exports.localFileUpload = async(req,res) => {
    try {
        //agr hme file access krni hai toh hme krna hoga rew.files.file;
        
        const file = req.files.file;
        console.log("File aagyi JEE -> " ,file)

        let path = __dirname + "/files/" +Date.now()+ `.${file.name.split('.')[1]}`; 
        
        file.mv (path , (err)=>{
            console.log(err)
        });
        res.json({
            success:true,
            message:'Local File Uploaded Successfully '
        })


    } catch (error) {
        
    }
}