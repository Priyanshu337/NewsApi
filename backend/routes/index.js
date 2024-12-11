const express = require('express');
const router = express.Router();

const { addArticle, listArticle, articleById } = require('../controllers/article.js');

router.post('/api/postArticle', addArticle);

router.get('/api/listArticle', listArticle);

router.get('/api/articleId/:articleId', articleById);

module.exports = router;
