import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import Searchbar from '../component/searchbar';
import { useContext } from 'react';
import { newsContext } from '../contextApi/newsApi';
import Loader from '../component/Loader';

function DisplayArticle() {
    const { fetchArticleByID, fetchArticle, paragraphs, upVotes, downVotes, loadArticle, setLoadArticle, loading } = useContext(newsContext);
    const { articleId } = useParams();
    console.log(loadArticle.sentiment)

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
                // console.log(data)
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, [articleId]);

    const handleUpVote = async () => {
        try {
            console.log('upvote called')
            const updatedArticle = await upVotes(articleId);
            setLoadArticle(updatedArticle); // Update state with the new data

            console.log("Upvoted!");
        } catch (err) {
            console.error("Error upvoting:", err);
        }
    };

    const handleDownVote = async () => {
        try {
            const updatedArticle = await downVotes(articleId);
            setLoadArticle(updatedArticle); // Update state with the new data

            console.log("Downvoted!");
        } catch (err) {
            console.error("Error downvoting:", err);
        }
    };

    if (loading) {
        return (
            <div className="loader_wrapper">
                <Loader />
            </div>
        );
    }

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
                        <div className='vote'>
                            <button onClick={handleUpVote}>⬆︎</button>
                            <p >{loadArticle.votes}</p>
                            <button onClick={handleDownVote}>⬇︎</button>


                        </div>
                        <div>
                            <b>Sentiment:</b>
                            <p style={{
                                backgroundColor: loadArticle.sentiment?.trim().toLowerCase() === 'positive' ? 'green' : 'red',
                                color: 'white',
                                border: '1px solid black',
                                borderRadius: '20px'
                            }}>{loadArticle.sentiment}</p>
                        </div>
                    </div>
                </div>
                <div className='suggestion-wrapper'>
                    {/* <Searchbar /> */}
                </div>
            </div >
        </div >
    );
}

export default DisplayArticle;




