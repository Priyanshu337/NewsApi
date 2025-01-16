import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import './searchbar.css'
import { newsContext } from '../contextApi/newsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Searchbar() {
    const { search, searchResults, articles, setSearch } = useContext(newsContext);
    const [showResults, setShowResults] = useState(false);


    return (
        <div className="main-search">
            <div className="searchWrapper">
                <div className='searchbar'>
                    <FontAwesomeIcon style={{ color: 'black', margin: '5px' }} icon={faSearch} size="lg" />
                    <input
                        type="text"
                        className="search-wrapper"
                        placeholder="Search for articles"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            if (!showResults) setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                    // onBlur={(e) => {
                    //     if (!e.currentTarget.contains(e.relatedTarget)) setShowResults(false);
                    // }}
                    />
                </div>
            </div>

            {showResults && (
                <ul className="ul-wrapper">
                    {(!search ? articles : searchResults).map((article) => {
                        const maxLength = 100;
                        const content =
                            article.content.length > maxLength
                                ? article.content.substring(0, maxLength) + '...'
                                : article.content;

                        return (
                            <li className="li-link" key={article._id}>
                                <Link className="link" to={`/dispArticle/${article._id}`}>
                                    <div className="search">
                                        <div className="link-div">
                                            <label className="label-name">Name: {article.name}</label>
                                            <label className="label-title">Title: {article.title}</label>
                                            <label className="label-content">Content: {content}</label>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                width: '70px',
                                                alignContent: 'center',
                                            }}
                                        >
                                            {article.imageURL ? (
                                                <img
                                                    src={article.imageURL}
                                                    alt="Article"
                                                    style={{ height: '50px', width: '50px' }}
                                                />
                                            ) : (
                                                <div style={{ height: '50px', width: '50px', background: '#ccc' }} />
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Searchbar;








// import React, { useEffect, useState, useContext } from 'react';
// import { Link } from "react-router-dom";
// import '../article/Article.css';
// import { newsContext } from '../contextApi/newsApi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// function Searchbar() {
//     const { search, searchResults, articles, setSearch } = useContext(newsContext);
//     console.log(articles);

//     return (
//         <div className="main-search">
//             <div className="searchWrapper">
//                 <div>
//                     <FontAwesomeIcon icon={faSearch} size="lg" />
//                 </div>
//                 <input
//                     type="text"
//                     className="search-wrapper"
//                     placeholder="Search for articles"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     style={{ width: '400px' }}
//                 />
//             </div>
//             <ul className="ul-wrapper">

//                 {(!search ? articles : searchResults).map((article) => {
//                     const maxLength = 100;
//                     const content =
//                         article.content.length > maxLength
//                             ? article.content.substring(0, maxLength) + '...'
//                             : article.content;

//                     return (
//                         <li className="li-link" key={article._id}>
//                             <Link className="link" to={`/dispArticle/${article._id}`}>
//                                 <div className="search-wrap">
//                                     <div className="link-div">
//                                         <label className="label-name">Name: {article.name}</label>
//                                         <label className="label-title">Title: {article.title}</label>
//                                         <label className="label-content">Content: {content}</label>
//                                     </div>
//                                     <div
//                                         style={{
//                                             display: 'flex',
//                                             flexDirection: 'column',
//                                             justifyContent: 'center',
//                                             width: '70px',
//                                             alignContent: 'center',
//                                         }}
//                                     >
//                                         {article.imageURL ? (
//                                             <img
//                                                 src={article.imageURL}
//                                                 alt="Article"
//                                                 style={{ height: '50px', width: '50px' }}
//                                             />
//                                         ) : (
//                                             <div style={{ height: '50px', width: '50px', background: '#ccc' }} />
//                                         )}
//                                     </div>
//                                 </div>
//                             </Link>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// }

// export default Searchbar;
