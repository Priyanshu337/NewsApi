import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user')
        if (!user) {
            navigate('/login')
        }
    }

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

            <button className='button'>
                <Link to='/search'>
                    Search
                </Link>
            </button>

            <label>
                {user ?
                    (
                        <label>
                            <select onChange={(e) => {
                                if (e.target.value === 'logout') {
                                    logout();
                                }
                            }}
                            >
                                <option value="user">{user.name}</option>
                                <option value="logout">logout</option>
                            </select>
                        </label>


                    ) : (
                        <button>
                            <Link to='/'>Login</Link>
                        </button>
                    )
                }
            </label>
        </div >
    )
}

export default Sidebar


