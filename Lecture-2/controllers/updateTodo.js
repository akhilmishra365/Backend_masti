const todos = require ('../models/todo');
exports.updateTodo = async (req, res) => {

    try {
        const id = req.params.id;
        const{title, description} = req.body;
        const todo = await todos.findByIdAndUpdate(
            {_id:id}, 
            {title,description,updatedAt: Date.now()},
        );
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: "Todo updated successfully"
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