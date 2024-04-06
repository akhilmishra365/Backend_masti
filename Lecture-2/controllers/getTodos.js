const todo = require('../models/todo');

exports.getTodos = async(req,res)=>{
    try {
        //fetch all todos from the db

        const todos = await todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
            message: "All Todos fetched successfully"
        
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });

        
    }
}