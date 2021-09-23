import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {setAlert} from "../../actions/alert"
import {connect} from "react-redux";

const Register = ({setAlert}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData

    const onChange = (e) => setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value})
    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Password do not match', 'danger')
        } else {
            console.log("SUCCESS")
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" onChange={e => onChange(e)} value={name} name="name"
                           required/>
                </div>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => onChange(e)} placeholder="Email Address"
                           name="email"/>
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
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
                <div className="form-group">
                    <input
                        type="password"
                        value={password2}
                        onChange={e => onChange(e)}
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </>
    );
};

export default connect(null, {setAlert})(Register);