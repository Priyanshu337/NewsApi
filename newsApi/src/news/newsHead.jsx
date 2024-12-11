import React from 'react'
import './styles.css'

function NewsHead({ data }) {
    const maxLength = 50;
    const title = data.length > maxLength ? data.substring(0, maxLength) + ".." : data;


    return (
        <div className='newsHead'>
            <b>{title}</b>
        </div>
    )
}

export default NewsHead