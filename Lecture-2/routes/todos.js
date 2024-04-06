//agr tumko route ko controller ko route ke saath map krana hai toh sbse pehle usko import krna pdega
//fir map kr denge

const express = require('express');
const router = express.Router();
const {createTodo} = require('../controllers/createTodo');
const {getTodos} = require('../controllers/getTodos');
const {getTodosById} = require('../controllers/getTodosById');
const{updateTodo} = require('../controllers/updateTodo');
const {deleteTodo} = require('../controllers/deleteTodo');
//define api routes


//jb is /createTodo pe post request aayegi toh createTodo function ko call kro
//vhi hmari mapping hai ;
router.post('/createTodo', createTodo);
router.get('/getTodos', getTodos);
router.get('/getTodos/:id', getTodosById);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);


module.exports = router;


