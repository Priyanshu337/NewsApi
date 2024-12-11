import React from 'react'

function NewsCategory({ data }) {

    return (
        <div className='newsCategory'>
            <label>Categories:</label>
            {data.map((cat, i) => (
                <label key={i}> {cat.CATEGORY}   |    </label>
            ))}
        </div>
    )
}

export default NewsCategory