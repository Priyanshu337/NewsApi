import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../article/Article.css'
import { useContext } from 'react';
import { newsContext } from '../contextApi/newsApi';

function Searchbar() {

    const { search, searchResults, setSearch } = useContext(newsContext);

    return (
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
                    {searchResults.map((article) => (
                        <li key={article._id}><Link to={`/dispArticle/${article._id}`}>{article.title}</Link></li>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default Searchbar