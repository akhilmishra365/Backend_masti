const express = require('express')
const router = express.Router();



//controler import 

const {signup , login} = require ("../controllers/Auth");

router.post("/login",login)
router.post("/signup", signup)


module.exports = router; 