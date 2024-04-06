//import the model 
const todo = require('../models/todo');

//dekho agr hm yha pahuche hai toh kisi na kisi route ki wajah se hi pohache hai so us route ko handle krne ke liye hm routehandler ka use krenge
//define route handler 

//async is liye kyunki hm ni chahte ki hmara server ruk jaye jb tk hmara code execute ho rha hai
//is liye use async krte hai taaki hmara main  thread block na ho 
exports.createTodo = async (request, response) => {
    try {
        // Extract title and description from request body 
        const { title, description } = request.body;

        // Create a new todo object and insert it in the DB
        const createdTodo = await todo.create({ title, description });

        // Send the response with a success flag 
        response.status(200).json({
            success: true,
            data: createdTodo,
            message: "Entry Created Successfully"
        });
    } 
     ///AGR Fail ho gya toh kya krenge  ==> usko catch krenge
    catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
}
   