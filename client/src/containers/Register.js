import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../config';
import {useNavigate} from 'react-router-dom'

const Register = (props) => {
	const [ form, setValues ] = useState({
		email: '',
		password: '',
		password2: '',
        name: '',
	});
	const [ message, setMessage ] = useState('');

	const navigate=useNavigate()

	const handleChange = (e) => {
		setValues({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		// debugger
		e.preventDefault();
		try {
			const response = await axios.post(`${URL}/users/register`, {
				email: form.email,
				password: form.password,
				password2: form.password2,
                name: form.name,
			});
			setMessage(response.data.message);
			console.log(response)
			if (response.data.ok) {
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
		<h1>Sign Up</h1>
		
		<form onSubmit={handleSubmit} onChange={handleChange} className="form_container">
			<label>Email</label>
			<input type="email" name="email" placeholder="Your email"/>

			<label>Password</label>
			<input type ="password" name="password" placeholder="Your password"/>

			<label>Repeat password</label>
			<input type ="password" name="password2" placeholder="Repeat your password" />

            <label>Name</label>
			<input name="name" placeholder="Your name"/>
			<><button className="spec-button">Sign Up</button></>
			
			<div className="message">
				<h4>{message}</h4>
			</div>
		</form> </>
	);
};

export default Register;
