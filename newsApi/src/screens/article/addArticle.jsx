import React, { useContext, useEffect, useState } from 'react';
import './addArticle.css';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { newsContext } from '../../contextApi/newsApi';

function AddArticle() {

    const { postData } = useContext(newsContext);
    const [date, setDate] = useState();

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [categories, setCategories] = useState([]);

    const params = {
        name,
        title,
        content,
        imageURL,
        votes: 0,
        CATEGORY: categories,
        sentiment: "Positive",
    };

    console.log(params)

    const handleInputChange = (event, index) => {
        const updatedCategories = [...categories];
        updatedCategories[index].category = event.target.value;
        setCategories(updatedCategories);
    };

    const addCategory = () => {
        setCategories([...categories, { id: uuidv4(), category: '' }]);
    };

    const removeCategory = (index) => {
        setCategories(prevArray => prevArray.splice(index, 1));
    };

    const currentDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }


    const btnClick = async () => {
        try {
            const response = await postData(params);
            const data = await response.json();
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="add-article-container">
            {/* Left Section - Form */}
            <div className="form-section">
                <h2>Add Article</h2>
                <div className='form-wrapper'>
                    <div>
                        <div className="form-group">
                            <label>Enter Name of the Article:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Article name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Enter Title of the Article:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Article title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Enter Image URL for the Article:</label>
                            <input
                                type="text"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                placeholder="Image URL"
                            />
                        </div>
                        <div className="form-group">
                            <label>Categories:</label>
                            <div className="categories-container">
                                {categories.map((category, index) => (
                                    <div key={category.id} className="category-item">
                                        <input
                                            type="text"
                                            value={category.category}
                                            onChange={(e) => handleInputChange(e, index)}
                                            placeholder="Category"
                                        />
                                        <button
                                            className="remove-category"
                                            onClick={() => removeCategory(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button className="add-category" onClick={addCategory}>
                                    + Add Category
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Enter Content of the Article:</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Article content"
                            ></textarea>
                        </div>
                    </div>

                </div>
                <button className="submit-btn" onClick={btnClick}>
                    Add Article
                </button>
            </div>



            {/* Right Section for Preview */}
            <div className="preview-section">
                <h2>Preview of your article </h2>
                <div className="preview-article">
                    <div className='article-heading'>
                        <h2>{title}</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div className='article-name'>
                            <label>{name}</label>|
                            <label><b>Created at: </b>{currentDate()}</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img style={{ width: '650px', height: '550px' }} src={imageURL} alt="Article" />
                        </div>
                    </div>
                    <div className='article-content'>
                        <div className='content'>
                            <label>{content}</label>

                            {categories.length > 0 && (
                                <div className="preview-categories">
                                    <strong>Categories:</strong>
                                    <ul>
                                        {categories.map((category) => (
                                            <li className='category-list' key={category.id}>{category.category}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default AddArticle;
