
const express = require('express');
const router = express.Router();


//omport controller
const {createComment} = require('../controllers/commentController');
const {createPost , getAllPosts} = require('../controllers/postController');
const {likePost , unlikePost } = require('../controllers/likeController')

router.post('/createComment', createComment);
router.post('/createPost', createPost);
router.get('/posts' , getAllPosts)
router.post("/likes/like",likePost)
router.get('/likes/unlike',unlikePost)

 



module.exports = router;