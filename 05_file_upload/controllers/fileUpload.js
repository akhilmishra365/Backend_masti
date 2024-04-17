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

async function uploadFileToCloudinary (file,folder,quality) {
  
    
   const options = {folder}
   //from cloudinary documentatiom 
   console.log('temp file Path' , file.tempFilePath)
   //auto krna generally jyada acha hai 

   //ye qualty paramerter defines qualyty of image i.e image compress kr dewta hai 
   if(!quality)
   {
    options.quality = quality ;
   }
   options.resource_type = "auto";
   return await Cloudinary.uploader.upload(file.tempFilePath ,options ) ; 

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


//video Upload Handler ==>

exports.videoUpload  = async (req,res) => {
    try {
        //data fetch 

        const {name,tags,email} = req.body
        console.log(name,tags,email) ; 

        const file = req.files.videoFile;
        const supportedTypes =  ["mp4" , "mov"] ;
        const filetype = file.name.split(".")[1].toLowerCase();
        console.log("file Type" ,filetype) ;

        //TODO : ADD A UPPER LIMIT OF VIDEO SIZE OF 5MB

        if(!isfileTypeSupported (filetype ,supportedTypes )  ) 
        {
            return res.status(400).json({
                success:false,
                message:"File Format not Supported "
            })
        }

        //file format suppoerted 

        const response = await uploadFileToCloudinary(file , "CloudUpload" );
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
            message:'Video Successfully Uploaded', 
        })



        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
        
    }
}

exports.imageSizeReducer = async(req,res) =>{
    try {
        const{name,tags,email} = req.body
        console.log(name,tags,email)

//ye jo imagefile hai ye file ki key hai jo ki hmne request me send ki hai 
        const file = req.files.imageFile;
        

        const supportedTypes = ["jpg" , "jpeg" , "png"];
        const fileType = file.name.split('.')[1].toLowerCase() ;
//todo => check for file limit 

        if(!isfileTypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not Supported "
            })
        }

        //file formAT SUPPORTED 
//ye jo 30 hai vo quality ka attribute hai jisse ki im,age compress ho jati hai 
        const response = await uploadFileToCloudinary(file , "CloudUpload" ,30);
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




