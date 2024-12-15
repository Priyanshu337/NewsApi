import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Article.css'

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/listArticle/");
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                console.error("Error fetching articles:", err);
                setError("Failed to fetch articles. Please try again later.");
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setSearchResults([]); // Clear results if search is empty
            return;
        }

        const searchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/article/search?q=${search}`
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (err) {
                console.error("Error searching articles:", err);
                setError("Failed to fetch search results. Please try again later.");
            }
        };

        const debounceTimer = setTimeout(searchData, 300);
        return () => clearTimeout(debounceTimer);
    }, [search]);

    return (
        <div className="articleContainer">
            <div className="articleListMain">
                <div className="articlelistContainer">
                    <label>Articles</label>
                    <div className="articleList">
                        {articles.map((article) => (
                            <div key={article._id} className="articlelist-content">
                                <Link to={`/dispArticle/${article._id}`}>
                                    <label className="articleLabel">{article.title}</label>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="searchWrapper">
                <input
                    type="text"
                    className="search-wrapper"
                    placeholder="Search for articles"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="results-container">
                    <ul className="ul-wrapper">
                        {searchResults.map((result) => (
                            <li key={result._id}>{result.title}</li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>

    );
}

export default ArticleList;
