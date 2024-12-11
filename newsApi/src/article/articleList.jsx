import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ArticleList() {

    const [article, setArticle] = useState([]);
    console.log(article, 'article');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/listArticle/');
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchArticle();
    }, [])

    return (
        <div className='main-articlelist'>
            <h1> Articles</h1>

            {article.map((article, index) => (
                <React.Fragment key={index}>
                    <div className='articlelist-content'>
                        <Link key={article._id} to={`/dispArticle/${article._id}`} >
                            <label>
                                {article.name}
                            </label>
                        </Link>
                    </div>
                </React.Fragment>
            ))
            }
        </div >
    )
}

export default ArticleList