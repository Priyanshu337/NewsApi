import React, { createContext, useEffect, useState } from 'react';

export const newsContext = createContext();

function NewsApi({ children }) {

    const [newsData, setNewsData] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loadArticle, setLoadArticle] = useState({});
    const [paragraphs, setParagraphs] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setloading] = useState(false);


    // Fetch articles from external API

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setloading(true);
                const response = await fetch('https://data-api.cryptocompare.com/news/v1/article/list?lang=EN&limit=10');
                const data = await response.json();
                setNewsData(data.Data);
                setloading(false);

            } catch (err) {
                console.error('Error fetching news:', err);
            }
        };
        fetchNews();
    }, []);

    // Add article
    const postData = async (params) => {
        try {
            const response = await fetch('http://localhost:8080/api/postArticle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const ans = await response.json();
            console.log(ans);
        } catch (err) {
            console.log(err);
        }
    };


    // Fetch article by ID
    const fetchArticleByID = async (articleId) => {
        try {
            setloading(true);
            const response = await fetch(`http://localhost:8080/api/article/${articleId}`);
            const data = await response.json();
            setLoadArticle(data);
            setloading(false);
            if (data.content) {
                paragraph(data.content);
            }
        } catch (err) {
            console.error('Error fetching article:', err);
        }
    };

    // Fetch all articles
    const fetchArticle = async () => {
        try {
            setloading(true);
            const response = await fetch("http://localhost:8080/api/listArticle ");
            const data = await response.json();
            setArticles(data);
            setloading(false);


        } catch (err) {
            console.error('Error fetching articles:', err);
        }
    };

    // Search articles based on query
    useEffect(() => {
        const searchData = async () => {
            if (search.trim() === "") {
                setSearchResults([]);
                return;
            }
            try {
                setloading(true);

                const response = await fetch(`http://localhost:8080/api/article/search?q=${search}`);
                const data = await response.json();
                setSearchResults(data);
                setloading(false);
            } catch (err) {
                console.error('Error searching articles:', err);
            }
        };
        const debounceTimer = setTimeout(searchData, 300); // Add debounce for smoother performance
        return () => clearTimeout(debounceTimer);
    }, [search]);

    // Divide content into paragraphs
    const paragraph = (content) => {
        const words = content.split(' ');
        const wordsPerParagraph = Math.ceil(words.length / 4);
        const newParagraphs = [];
        for (let i = 0; i < words.length; i += wordsPerParagraph) {
            newParagraphs.push(words.slice(i, i + wordsPerParagraph).join(' '));
        }
        setParagraphs(newParagraphs);
    };
    const upVotes = async (articleId, userId) => {
        try {
            console.log(userId, 'User ID in FE for Upvote');

            const response = await fetch(`http://localhost:8080/api/article/${articleId}/upVote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Properly pass userId as JSON
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const article = await response.json();
            console.log(article, 'Updated article from Upvote');
            return article;
        } catch (err) {
            console.error('Error in upVotes:', err);
            throw err;
        }
    };

    const downVotes = async (articleId, userId) => {
        try {
            console.log(userId, 'User ID in FE for Downvote');

            const response = await fetch(`http://localhost:8080/api/article/${articleId}/downVote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }), // Properly pass userId as JSON
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const article = await response.json();
            console.log(article, 'Updated article from Downvote');
            return article;
        } catch (err) {
            console.error('Error in downVotes:', err);
            throw err;
        }
    };



    const signup = async (params) => {
        try {
            const response = await fetch('http://localhost:8080/api/article/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error:', error);
                return;
            }
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        } catch (error) {
            console.log("This is the error from context api", error)
        }
    }

    const login = async (params) => {
        try {
            const response = await fetch('http://localhost:8080/api/article/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <newsContext.Provider
            value={{
                fetchArticleByID,
                fetchArticle,
                upVotes,
                downVotes,
                loadArticle,
                setLoadArticle,
                articles,
                paragraphs,
                newsData,
                search,
                setSearch,
                searchResults,
                setSearchResults,
                loading,
                postData,
                login,
                signup,
            }}
        >
            {children}
        </newsContext.Provider>
    );
}

export default NewsApi;
