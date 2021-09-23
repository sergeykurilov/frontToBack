import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    const onChange = (e) => setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value})
    const onSubmit = async e => {
        e.preventDefault()
        console.log("SUCCESS")
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => onChange(e)} placeholder="Email Address"
                           name="email"/>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={e => onChange(e)}
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </>
    );
};

export default Login;