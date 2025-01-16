import React, { useContext, useState } from 'react'
import './login.css';
import { newsContext } from '../../contextApi/newsApi';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();

    const { login } = useContext(newsContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const params = { email, password };

    const signin = async () => {
        const userLogin = await login(params);
        if (userLogin) {
            navigate('/newsArticle')
        }
    }

    return (
        <div className='login'>
            <div className='main'>
                <h2>Sign-In</h2>
                <div className='login-form'>
                    <div className='label'>
                        <label>E-mail:</label>
                        <label>Password:</label>
                    </div>
                    <div className='input'>
                        <input type="text" placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>
                        <input type="password" placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} ></input>
                    </div>
                </div>
                <div>
                    <button onClick={signin}>Sing-In</button>
                </div>
            </div >
        </div >
    );
}

export default Login