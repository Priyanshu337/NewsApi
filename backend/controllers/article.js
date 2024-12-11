const articleModel = require('../Model/articleModel');

const addArticle = async (req, res) => {
    try {
        const { name, title, content } = req.body;
        const newArticle = new articleModel({
            id: Math.random().toString,
            name,
            title,
            content,
        });
        console.log(newArticle);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
        console.log(savedArticle, "This is the article that is get in  backend ");
    } catch (error) {
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const articleById = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        console.log('apihit');
        const article = await articleModel.findById(articleId);
        console.log(article, "article by id");
        if (article) {
            res.send(article);
        }
        else {
            res.status(404).json({ error: "no article found" });
        }
    }
    catch (error) {
        console.log(error)
    };
}


const listArticle = async (req, res) => {
    try {
        // const paramsId = req.params.article_id.articleId;
        const article = await articleModel.find();
        if (article.length > 0) {
            res.json(article);
        }
        else {
            res.status(404).json({ error: 'no article found' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addArticle, listArticle, articleById };

// we will crech show all article as well 
// i need to figure out how to add image on db 

