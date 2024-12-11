import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Scrollbar } from 'react-scrollbars-custom';


function DisplayArticle() {

    const { articleId } = useParams();

    const [loadArticle, setLoadArticle] = useState({});

    console.log("setLoadArticle", loadArticle);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/articleId/${articleId}`);
            const data = await response.json();
            console.log(data, "here")
            setLoadArticle(data);
        }
        fetchData();
    }, [articleId]);

    if (!loadArticle) {
        return <p>Loading article...</p>;
    }
    return (
        <div className='article_main'>
            <div className="article_title">
                <h1>{loadArticle.title}</h1>
            </div>
            <div className="article_name">
                <label> {loadArticle.name}</label>
            </div>
            <div className="article_content">
                <Scrollbar style={{ width: 250, height: 250 }}>
                    <p>{loadArticle.content}</p>
                </Scrollbar>
            </div>
        </div >
    )
}

export default DisplayArticle