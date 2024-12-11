import React from 'react'
import './styles.css'

function Newsdescription({ data }) {
    const maxLength = 100;
    const description = data.length > maxLength ? data.substring(0, maxLength) + "..." : data;

    return (
        <div className="newsdescription">
            <label> {description}</label>
        </div>
    )
}

export default Newsdescription