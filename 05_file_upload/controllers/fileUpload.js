const File = require("../models/File") ; 
const Cloudinary = require("cloudinary").v2; 

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
        console.log("Not able to upload the file ");
        console.log("error");
        
    }
}

function isfileTypeSupported (type , supportedTypes) {
        return supportedTypes.includes(type);
}

//fucntion for uploading filse to cloudinary ; 

async function uploadFileToCloudinary (file,folder) {
  
    
   const options = {folder}
   //from cloudinary documentatiom 
   return await Cloudinary.uploader.upload(file.tempFilePath ,options) ; 

}




exports.imageUpload = async(req, res) =>{
    try {
        const{name,tags,email} = req.body
        console.log(name,tags,email)

//ye jo imagefile hai ye file ki key hai jo ki hmne request me send ki hai 
        const file = req.files.imageFile;
        

        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase() ;


        if(!isfileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not Supported "
            })
        }

        //file formAT SUPPORTED 

        const response = await uploadFileToCloudinary(file , "CloudUpload");
        console.log(response) ; 

        //db me entry save krni hia 
        const fileData = File.create({
            name,
            tags, 
            email,
            imageUrl : response.secure_url,


        })

        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:'Image Successfully Uploaded', 
        })

    } catch (error) {
        console.error(error) 
        res.status(400).json({
            success:false,
            message:'Something went wrong '
        })
        
    }
}

