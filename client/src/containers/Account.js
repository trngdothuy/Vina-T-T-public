import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";

const Account = ({logout, findUser, user, setUser, userEmail}) => {
	let navigate = useNavigate()
	
	useEffect(() => {
		findUser(userEmail);
		}, []); // user

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
				logout
			</button>	
			<h2>Your information</h2>
			<div>
				<p>Your Email: {user.email}</p>
				<p>Your Favorite: {user.favorite}</p>
				<p>Your Address: {user.address}</p>
				</div>		
		</div>
	);
};

export default Account;
