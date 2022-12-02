import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";
import useStateWithCallback from 'use-state-with-callback';
// import { register } from '../../../server/controllers/user';
// import { useForm } from "react-hook-form";

const Account = ({logout, findUser, user, setUser, userEmail, updateUser}) => {
	
	let navigate = useNavigate()
	const [newUser, setNewUser] = useStateWithCallback({},()=>{console.log("newuser",newUser,user)})
	
	// const {register, handleSubmit} = useForm();
	console.log(newUser)

	useEffect(() => {
		//debugger
		findUser(userEmail);
		}, []); // user

		useEffect(() => {
			setNewUser({...user})
			}, [user]); // user

	const handleSubmit = (e) => {
		e.preventDefault(); 
		console.log(e)
		// setUser(newUser)
		// console.log('this is new user after submitting')
		// console.log(newUser)
		updateUser(user, newUser)
	}
	
	const handleChange = (e) => {
		// debugger
		console.log('this is new user change')
		console.log(newUser)
	setNewUser({...newUser, [e.target.name]: e.target.value})
	console.log(e.target.name)
	console.log(e.target.value)
	};

	return (
		<div className="secret_page">
			<h1>Account</h1>
			<h2>You can access here only after log in</h2>
			<button className="big-button"
				onClick={() => {
					logout();
					navigate('/')
				}}
			>
				Log Out
			</button>	
			{user && <form onSubmit={handleSubmit}><h2>Your information</h2>
			<div>
				<div className="account-info">
					<label htmlFor="email">Email: </label>
					<span><input 
					type="email"
					value={user.email} 
					disabled = {true}
					onChange={handleChange}></input></span></div>
				<div className="account-info">
					<label htmlFor="firstName">First Name:</label>
					<span><input 
					type="text"
					name="firstname"
					value={newUser.firstname} 
					placeholder={newUser.firstname||"Your name"}
					onChange={handleChange}></input></span></div>
				<div className="account-info">
					<label htmlFor="lastName">Last Name: </label>
					<span><input 
					type="text" 
					name="lastname"
					onChange={handleChange}
					value={newUser.lastname} 
					placeholder={user.lastname || "Your Last Name"}></input></span></div>
				<div className="account-info">
					<label htmlFor="dob">Birthday:</label>
					<span><input
					type="date" 
					name="dob"
					value={newUser.dob} 
					placeholder={user.dob || "Your Birthday"}
					onChange={handleChange}></input></span></div>
				<div className="account-info">
					<label htmlFor="address">Address:</label>
					<span><input 
					type="text" 
					name="address"
					value={newUser.address}
					placeholder={user.address || "Your Address"}
					onChange={handleChange}></input></span></div>
				<div className="account-info">
					<label htmlFor="phone">Phone Number:</label>
					<span><input
					type="tel" 
					name="tel"
					value={newUser.tel}
					placeholder={newUser.tel || "Phone Number"}
					onChange={handleChange}
					></input></span></div>
				</div>
				<button>Update Info</button>
				</form> 
				
				}
				
		</div>
	);
};

export default Account;
