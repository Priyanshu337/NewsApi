import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import '../article/Article.css'
import { useContext } from 'react';
import { newsContext } from '../contextApi/newsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar() {

    const { search, searchResults, loadArticle, setSearch } = useContext(newsContext);

    return (
        <div>
            <div className="searchWrapper">
                <div>
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                </div>
                <input
                    type="text"
                    className="search-wrapper"
                    placeholder=" Search for articles"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div >
            <ul className="ul-wrapper">
                {searchResults.map((article) => {
                    console.log(article);
                    const maxLength = 100;
                    const content = article.content.length > maxLength ? article.content.substring(0, maxLength) + '...' : article.content;
                    return (
                        <li className='li-link' key={article._id}>
                            <Link className='link' to={`/dispArticle/${article._id}`}>
                                <div className='search-wrap'>
                                    <div className='link-div'>
                                        <label className='label-name'> Name: {article.name}</label>
                                        <label className='label-title'>Title: {article.title}</label>
                                        <label className='label-content'>Content: {content}</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '70px', alignContent: 'center' }}>
                                        <img src={article.imageURL} style={{ height: '50px', width: '50px' }}></img>
                                    </div>
                                </div>
                            </Link></li>)
                })}
            </ul>
        </div>
    )
}

export default Searchbar