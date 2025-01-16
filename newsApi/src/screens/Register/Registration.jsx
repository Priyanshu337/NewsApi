import React, { useContext, useState } from 'react'
import { newsContext } from '../../contextApi/newsApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const { signup } = useContext(newsContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const params = { name, email, password }

    const handleSignup = async () => {
        const user = await signup(params);
        /// here we get the detail of user soo if you want to access then user usern.name, user.email
        if (user) {
            navigate('/newsArticle')
        }
    }
    return (
        <div className='login'>
            <div className='main'>
                <h2>Sign-Up</h2>
                <div className='login-form'>
                    <div className='label'>
                        <label>Name</label>
                        <label>E-mail:</label>
                        <label>Password:</label>
                    </div>
                    <div className='input'>
                        <input type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} ></input>
                        <input type="text" placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>
                        <input type="password" placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} ></input>
                    </div>
                </div>
                <div>
                    <button onClick={handleSignup}>Sing-Up</button>
                    <label>Already a user ?..<Link to='/login'>Sing-In</Link></label>
                </div>
            </div >

        </div >
    );
}

export default Registration