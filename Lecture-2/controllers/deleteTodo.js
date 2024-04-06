const todos = require('../models/todo');

 exports.deleteTodo = async (req, res) => { 
    try {
        const {id}=req.params;
        const todo = await todos.findOneAndDelete({_id:id});

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
            }
            res.status(200).json({
                success: true,
                data: todo,
                message: "Todo deleted successfully"
            });
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