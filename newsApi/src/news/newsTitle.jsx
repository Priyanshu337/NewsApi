import React from 'react'

function NewsTitle({ data }) {
    return (
        <div className='newsTitle'>
            <label>{data}</label>
        </div>
    )
}

export default NewsTitle