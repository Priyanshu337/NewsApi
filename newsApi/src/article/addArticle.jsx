import React, { useEffect, useState } from 'react';
import './addArticle.css';

function AddArticle() {

    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const params = {
        name: name,
        title: title,
        content: content
    }



    const postData = (async () => {
        try {
            const response = await fetch('http://localhost:8080/api/postArticle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            const ans = response.json();
            console.log(ans)
        } catch (err) {
            console.log(err)
        }
    })

    return (
        <div className='main'>
            <label>Enter Details</label>
            <div className='articleWrapper'>
                <div className='articleHeading'>
                    <label>Enter Name of the Article:</label>
                    <label>Enter Title of the Article:</label>
                    <label>Enter Content of the Article:</label>
                </div>
                <div className='articleInput'>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
                    <textarea value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>
                </div>


            </div>
            <div className='btnWrapper'>
                <button className="addBtn  " onClick={postData}> Add Article</button>
            </div>
        </div>
    )
}

export default AddArticle