import React, { createContext, useEffect, useState } from 'react';

export const newsContext = createContext();

function NewsApi({ children }) {
    const [newsData, setNewsData] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loadArticle, setLoadArticle] = useState({});
    const [paragraphs, setParagraphs] = useState();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Fetch articles from external API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://data-api.cryptocompare.com/news/v1/article/list?lang=EN&limit=10');
                const data = await response.json();
                setNewsData(data.Data);
            } catch (err) {
                console.error('Error fetching news:', err);
            }
        };
        fetchNews();
    }, []);

    // Fetch article by ID
    const fetchArticleByID = async (articleId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/articleId/${articleId}`);
            const data = await response.json();
            setLoadArticle(data);
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
            const response = await fetch("http://localhost:8080/api/listArticle/");
            const data = await response.json();
            setArticles(data);
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
                const response = await fetch(`http://localhost:8080/api/article/search?q=${search}`);
                const data = await response.json();
                setSearchResults(data);
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

    return (
        <newsContext.Provider
            value={{
                fetchArticleByID,
                fetchArticle,
                loadArticle,
                articles,
                paragraphs,
                newsData,
                search,
                setSearch,
                searchResults,
            }}
        >
            {children}
        </newsContext.Provider>
    );
}

export default NewsApi;
