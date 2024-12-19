import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Article.css'
import Searchbar from "../component/searchbar";
import { useContext } from 'react';
import { newsContext } from '../contextApi/newsApi';

function ArticleList() {
    const { articles, fetchArticle } = useContext(newsContext);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchArticle();
                console.log(data)
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, []);

    return (
        <div className="articleContainer">
            <div className="articleListMain">
                <div className="articlelistContainer">
                    <div className="articleList">
                        {articles.map((article) => {
                            const maxLength = 130; // Set your desired maximum length
                            const content = article.content.length > maxLength
                                ? article.content.substring(0, maxLength) + '...'
                                : article.content;

                            return (
                                <div key={article._id} className="articlelist-content">
                                    <Link to={`/dispArticle/${article._id}`}>
                                        <div className="eachArticle">
                                            <div className="articleImage">
                                                <img className="imageContainer" src={article.imageURL} alt={article.title} />
                                            </div>
                                            <div className="articleDetails">
                                                <div>
                                                    <div className="articlediv">{article.title}</div>
                                                    <label className="articleLabel">{content}</label>
                                                </div>
                                                <div className="article-footer">
                                                    <p>By:{article.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Searchbar />
        </div>

    );
}

export default ArticleList;
