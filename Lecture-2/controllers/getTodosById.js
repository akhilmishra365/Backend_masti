const todos = require('../models/todo');




exports.getTodosById = async(req, res)=>{


    try {

        const id  = req.params.id;
        const todo = await todos.findById({_id:id})

        if(!todo){
            return res.status(404).json({
                success: false,
                
                message: "Todo not found"
            })

        }

        {/**By including data: todo in the response object, the client 
        receiving this response can access the fetched todo item and use it as needed.
        In the provided code excerpt, data: todo is a key-value pair
        within the response object that is being sent back to the client. */}
        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo fetched successfully"
        })  


        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
        
    }





}