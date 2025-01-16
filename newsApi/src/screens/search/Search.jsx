import React from 'react'
import './search.css'
import { useState } from 'react';
import { newsContext } from '../../contextApi/newsApi';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Search() {

    const { search, searchResults, articles, setSearch } = useContext(newsContext);
    const [showResults, setShowResults] = useState(false);

    return (
        <div className='search_main'>
            <div className='search-wrap'>
                <div className='searchbar-input'>
                    <FontAwesomeIcon style={{ color: 'black' }} icon={faSearch} size="lg" />
                    <input
                        type='text' className='search_input' placeholder='Enter text to search'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        onFocus={() => setShowResults(true)}
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setShowResults(false);
                        }}
                    ></input>
                </div>
                <div className='result' style={{
                    overflow: 'scroll', width: '40vw'
                }}>
                    {showResults && (
                        <ul style={{ listStyleType: 'none' }} >
                            {(!search ? articles : searchResults).map((article) => {

                                return (
                                    <li className='list' key={article._id}>
                                        <Link to={`/dispArticle/${article._id}`}>
                                            <div>
                                                <label> {article.title}</label>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )
                    }</div>
            </div>
            <div className='primary-container'>
                <div className='secondary-container'>
                    <button className='searchArticle'>
                        Search Article
                    </button>
                    <button className='feelingLucky'>
                        I'm Feeling Lucky
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Search