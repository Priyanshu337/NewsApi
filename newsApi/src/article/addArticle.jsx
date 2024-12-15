import React, { useState } from 'react';
import './addArticle.css';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

function AddArticle() {
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
        votes: 1,
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

    const postData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/postArticle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const ans = await response.json();
            console.log(ans);
        } catch (err) {
            console.log(err);
        }
    };

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
                <button className="submit-btn" onClick={postData}>
                    Add Article
                </button>
            </div>

            {/* Right Section for Preview */}
            <div className="preview-section">
                <h2>Preview</h2>
                <div className="preview-article">
                    <h1 className="preview-title">{name || "Article Name"}</h1>
                    <h2 className="preview-heading">{title || "Article Title"}</h2>
                    <p className="preview-content">
                        {content || "The content of your article will appear here..."}
                    </p>
                    {categories.length > 0 && (
                        <div className="preview-categories">
                            <strong>Categories:</strong>
                            <ul>
                                {categories.map((category) => (
                                    <li key={category.id}>{category.category || "Unnamed Category"}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddArticle;
