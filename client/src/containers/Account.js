import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";

const Account = ({logout}) => {
	let navigate = useNavigate()

	return (
		<div className="secret_page">
			<h1>Account</h1>
			<h2>You can access here only after verify the token</h2>
			<button className="big-button"
				onClick={() => {
					logout();
					navigate('/')
				}}
			>
				logout
			</button>			
		</div>
	);
};

export default Account;
