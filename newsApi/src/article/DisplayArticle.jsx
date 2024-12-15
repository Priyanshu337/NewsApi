import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';

function DisplayArticle() {
    const { articleId } = useParams();
    const [loadArticle, setLoadArticle] = useState({});

    const formatDateToNormal = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/articleId/${articleId}`);
                const data = await response.json();
                setLoadArticle(data);
            } catch (err) {
                console.error('Error fetching article:', err);
            }
        };
        fetchData();
    }, [articleId]);


    const upVotes = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/article/${articleId}/upVotes`, {
                method: 'POST',
            });

            const data = await response.json();

            console.log('Upvote successful:', data);

        } catch (err) {
            console.log(err);
        }
    };


    if (!Object.keys(loadArticle).length) {
        return <p>Loading article...</p>;
    }

    return (
        <div className="article_main">
            <div className="imageContent">
                {/* Placeholder for any image */}
                <img style={{ width: '500px', height: '450px' }} src={loadArticle.imageURL} alt="Article" />
            </div>
            <div className="articleContent">
                <div className="article_title">
                    <h2>{loadArticle.title}</h2>
                </div>
                <div className="article_name">
                    <div>
                        <label> By <b>{loadArticle.name}</b></label>
                    </div>
                    |
                    <div>
                        <p>{formatDateToNormal(loadArticle.CreatedAt)}</p>
                    </div>
                </div>
                <div className="article_content">
                    <p>{loadArticle.content}</p>
                </div>

                <div>
                    <p>Published At: {formatDateToNormal(loadArticle.PublishedAt)}</p>
                </div>
                <div className='votes_sentiment'>
                    <div>
                        <p >Votes:{loadArticle.votes}</p>
                        <div>
                            <button onClick={upVotes}>Up</button>
                            {/* <button onClick={downVote}>Down</button> */}
                        </div>
                    </div>
                    <p>Sentiment: {loadArticle.sentiment}</p>

                </div>
            </div>
        </div>
    );
}

export default DisplayArticle;
