import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";

const Account = (cart, setCart, logout) => {
	let navigate = useNavigate()
	const [total, setTotal] = useState(0)

	console.log('cart beginning')
	console.log(cart)
	
	
	const handleClickMinus = (index, product) => {
		let temp = [...cart]
		temp[index].quantity -= 1
		temp[index].quantity === -1 && temp.splice(index, 1)
		// console.log(temp)
		setCart(temp)
	   
		// console.log(categories)
		}
	
	  const handleClickAdd = (i) => {
		let temp = [...cart]
		temp[i].quantity += 1
		// console.log(temp)
		setCart(temp)
		}

		function changeArray () {
			setCart(Object.entries(cart)) // bug - how can I change from object to array?
			console.log('cart to array')
			console.log(cart)
				}
	
	useEffect(()=>{
		debugger
	changeArray()
	let prices = cart.map(e=>e.price*e.quantity)
	setTotal(prices.reduce((a,b)=>a+b))
	},[setCart, cart])
	

	return (
		<div className="secret_page">
			<h1>This is the Account page</h1>
			<h2>You can access here only after verify the token</h2>
			<button
				onClick={() => {
					logout();
					navigate('/')
				}}
			>
				logout
			</button>
			<span><h2>${total}</h2></span>

			{total > 500 ? 
        <p style={{color:"green"}}>Freeshipping</p> :       
        <p style={{color:"red"}}>Shipping will be charged</p>}

		<div className="wrapper">
				{(cart.isArray) && cart.map( (item, i) => {
					return (
						<div key={i} className="card">
							<img alt='productImage' src={item.image} />
							<p>{item.name}</p> 
							<p>${item.price}</p> 
							<div>
							<button onClick={()=>handleClickMinus(i)}>-</button> 
								{item.quantity}
							<button onClick={()=>handleClickAdd(i)}>+</button>
							</div>
							<p>${item.price * item.quantity}</p>
						</div> )})
				}
       </div>

			
		</div>
	);
};

export default Account;
