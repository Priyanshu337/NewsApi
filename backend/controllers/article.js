const articleModel = require('../Model/articleModel');

const addArticle = async (req, res) => {
    try {
        const { name, title, content, imageURL, votes, CATEGORY, sentiment } = req.body;

        const generateKeywords = (title, content) => {
            const words = `${title} ${content}`.replace(/[^\w\s]/g, '').split(/\s+/);
            const uniqueKeywords = Array.from(new Set(words));
            return uniqueKeywords.slice(0, 10);
        };

        const keywords = generateKeywords(title, content);

        const newArticle = new articleModel({
            name,
            title,
            content,
            imageURL,
            votes,
            CATEGORY,
            sentiment,
            keywords,

        });
        // here i need to create  a function to create a keyword and then store thgat as well in db 
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error creating article in controller file:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const articleById = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const article = await articleModel.findById(articleId);
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

const upVotes = async (req, res) => {
    try {
        console.log('called')

        const { articleId } = req.params;
        console.log(articleId, "THis is the article id i got ");
        const article = await articleModel.findById(articleId);
        if (article) {
            await articleModel.findByIdAndUpdate(articleId, {
                $inc: { upvotes: 1 },
            });
            res.json("SUCCESS")
        }
    } catch (err) {
        console.log(err);
    }
}

const search = async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        console.log("Cannot find search query");
    }
    try {
        const results = await articleModel.find({
            keywords: { $regex: searchQuery, $options: 'i' }
        });
        console.log(results)
        res.json(results);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addArticle, listArticle, articleById, upVotes, search };

