import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <button className='button'>
                <Link to="/newsArticle">Read Article</Link>
            </button>

            <button className='button'>
                <Link to="/AddArticle">
                    Add New Article</Link></button>

            <button className='button'>
                <Link to="/listArticle">
                    Show Added Articles Article</Link></button>

        </div>
    )
}

export default Sidebar