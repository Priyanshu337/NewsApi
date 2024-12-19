import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import Searchbar from '../component/searchbar';
import { useContext } from 'react';
import { newsContext } from '../contextApi/newsApi';

function DisplayArticle() {
    const { fetchArticleByID, fetchArticle, paragraphs, upVote, downVote, loadArticle } = useContext(newsContext);

    const { articleId } = useParams();


    const formatDateToNormal = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchArticleByID(articleId);
                console.log(data)
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, [articleId, fetchArticle]);

    const handleUpVote = async () => {
        try {
            await upVote(articleId);
            console.log("Upvoted!");
        } catch (err) {
            console.error("Error upvoting:", err);
        }
    };

    const handleDownVote = async () => {
        try {
            await downVote(articleId);
            console.log("Downvoted!");
        } catch (err) {
            console.error("Error downvoting:", err);
        }
    };

    return (
        <div className="article_main">
            <div className='header-wrapper'>
                <div className="article_title">
                    <h2>{loadArticle.title}</h2>
                </div>

                <div className="article_name">
                    <div className='articlename-wrapper'>
                        <label>{loadArticle.name}</label>
                        <b>|</b>
                        <p><b>Created on:  </b>{formatDateToNormal(loadArticle.CreatedAt)}</p>
                    </div>
                </div>

            </div>
            <div className='image-wrapper '>
                <div className="imageContent">
                    <img style={{ width: '650px', height: '550px' }} src={loadArticle.imageURL} alt="Article" />
                </div>
            </div>
            <div className='article-data'>
                <div className="articleContent">
                    <div className="article_content">
                        {paragraphs?.map((para, index) => (
                            <p className='para' key={index}>{para}</p>
                        ))}
                    </div>
                    <div className='category-container'>
                        <b>Categories:</b>
                        <div className='category'>
                            {loadArticle.CATEGORY?.map(({ category }) => {
                                return <label className='categoryLabel'> {category}</label>
                            })}
                        </div>

                    </div>
                    <div className='votes_sentiment'>
                        <div>
                            <p >Votes:{loadArticle.votes}</p>
                            <div>
                                <button onClick={handleUpVote}>UpVote</button>
                                <button onClick={handleDownVote}>DownVote</button>
                            </div>
                        </div>
                        <p><b>Sentiment:</b> {loadArticle.sentiment}</p>
                    </div>
                </div>
                <div className='suggestion-wrapper'>
                    <Searchbar />
                </div>
            </div >
        </div>
    );
}

export default DisplayArticle;
