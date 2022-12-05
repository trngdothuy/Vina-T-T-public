import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../config';
import {useNavigate} from 'react-router-dom'

const Register = (props) => {
	const [ form, setValues ] = useState({
		email: '',
		password: '',
		password2: '',
        name: '',
		checked: '',
	});
	const [ message, setMessage ] = useState('');
	const [buttonDisable, setButtonDisable] = useState(true)
	const [checked, setChecked] = useState(false)

	const navigate=useNavigate()

	function checkbutton () {
		//debugger
		(form.email.length > 0 && form.password.length >= 8 && form.password2.length >= 8 && form.name.length > 0 && checked === true) ?
		setButtonDisable(false)
		: setButtonDisable(true)
		console.log(buttonDisable) };

	const handleChange = (e) => {
		setValues({ ...form, [e.target.name]: e.target.value });
	};

	useEffect(() => {//debugger
		checkbutton()
	}, [checked, form]) ;

// 	function handleChangeCheckbox(e) {debugger
// 		setCheckboxActive(e.target.checked) 
// 	   console.log(checkboxActive)
// 	   checkbutton()
//    };

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
		
		<form onSubmit={handleSubmit} onChange={handleChange}className="form_container">
			<label>Email</label>
			<input type="email" name="email" placeholder="Your email"/>

			<label>Password</label>
			<input type ="password" name="password" placeholder="Your password"/>

			{(form.password.length < 8 && form.password2.length < 8) && <p className="message">*Your password should be at least 8 characters</p>}

			<label>Repeat password</label>
			<input type ="password" name="password2" placeholder="Repeat your password" />

			{form.password !== form.password2 && <p className="message">*Your password must match</p>}

            <label>Name</label>
			<input name="name" placeholder="Your name"/>

			<div className="checkbox-wrapper"><input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} required /> <span>I agree all terms and conditions</span></div>
			

			<div className="message">
				<h4>{message}</h4>
			</div>

			<><button className="spec-button" disabled={buttonDisable}>Sign Up</button>
			<a href = "./login">Already have an account?</a></>
			
			
		</form> </>
	);
};

export default Register;
