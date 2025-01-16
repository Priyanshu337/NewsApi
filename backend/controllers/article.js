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
            res.json(article);
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
        const { articleId } = req.params;
        const userId = req.body;

        console.log(userId.userId, "From upvote");

        const article = await articleModel.findById(articleId);

        if (article) {
            const upvoteIds = article.upvoteIds;
            const downvoteIds = article.downvoteIds;

            if (upvoteIds.includes(userId.userId)) {
                return res.status(200).json({
                    message: "User can only upvote once",
                    article,
                });
            }

            if (downvoteIds.includes(userId.userId)) {
                console.log(userId.userId, "Userid from upvote controller");
                article.downvoteIds = downvoteIds.filter((id) => id !== userId.userId);
                article.upvoteIds.push(userId.userId);
                article.votes += 2;
                await article.save();
                return res.status(200).json({
                    message: "Upvote successful, removed from downvote list",
                    article,
                });
            } else {
                article.upvoteIds.push(userId.userId);
                article.votes += 1;
                await article.save();
                return res.status(200).json({
                    message: "Upvote successful",
                    article,
                });
            }
        } else {
            return res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

const downVotes = async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.body;

        console.log(userId.userId, "UserId in BE at downvote");

        const article = await articleModel.findById(articleId);
        console.log(article, "API hit");

        if (article) {
            const upvoteIds = article.upvoteIds;
            const downvoteIds = article.downvoteIds;

            if (downvoteIds.includes(userId.userId)) {
                return res.status(200).json({
                    message: "User can only downvote once",
                    article,
                });
            }

            if (upvoteIds.includes(userId.userId)) {
                console.log(userId.userId, "UserId from downvote controller");
                article.upvoteIds = upvoteIds.filter((id) => id !== userId.userId);
                article.downvoteIds.push(userId.userId);
                article.votes -= 2;
                await article.save();
                return res.status(200).json({
                    message: "Downvote successful, removed from upvote list",
                    article,
                });
            } else {
                article.downvoteIds.push(userId.userId);
                article.votes -= 1;
                await article.save();
                return res.status(200).json({
                    message: "Downvote successful",
                    article,
                });
            }
        } else {
            return res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

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

module.exports = { addArticle, listArticle, articleById, upVotes, downVotes, search };

