const express = require('express');
const router = express.Router();

const { addArticle, listArticle, articleById, upVotes, downVote, search } = require('../controllers/article.js');

router.post('/api/postArticle', addArticle);

router.get('/api/listArticle', listArticle);

router.get('/api/articleId/:articleId', articleById);

router.post('/api/article/:articleId/upVotes', upVotes);
router.post('/api/article/:articleId/downVote', downVote);

router.get('/api/article/search', search)


module.exports = router;
