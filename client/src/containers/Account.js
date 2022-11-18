import React from 'react';	
import {useNavigate} from 'react-router-dom'

const Account = (props) => {
	let navigate = useNavigate()
	return (
		<div className="secret_page">
			<h1>This is the Account page</h1>
			<h2>You can access here only after verify the token</h2>
			<button
				onClick={() => {
					props.logout();
					navigate('/')
				}}
			>
				logout
			</button>
		</div>
	);
};

export default Account;
