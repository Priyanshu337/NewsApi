const express = require('express');
const router = express.Router();

const { addArticle, listArticle, articleById, upVotes, downVotes, search } = require('../controllers/article.js');
const { signup, login } = require('../controllers/loginController.js');

router.get('/api/article/search', search)
router.get('/api/listArticle', listArticle);
router.get('/api/article/:articleId', articleById);

router.post('/api/article/:articleId/upVote', upVotes);
router.post('/api/article/:articleId/downVote', downVotes);
router.post('/api/postArticle', addArticle);
router.post('/api/article/login', login);
router.post('/api/article/signup', signup);


module.exports = router;

