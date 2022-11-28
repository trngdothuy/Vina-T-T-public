import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";

const Cart = ({cart, setCart, logout}) => {
	let navigate = useNavigate()
	const [total, setTotal] = useState(0)

	console.log('cart beginning')
	console.log(cart)
	
	
	const handleClickMinus = (index, product) => {
		// console.log(index)
		let temp = [...cart]
		// console.log(temp)
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

	
	useEffect(()=>{
	// debugger
	let cart2 = [...cart]
	let prices = cart2.map(e=>e.price*e.quantity)
	if (prices.length !== 0) {
		setTotal(prices.reduce((a,b)=>a+b))
	} else {
		setTotal(0)
	}	
	},[(cart)])
	

	return (
		<div className="secret_page">
			<h1>Cart</h1>
			{/* <h2>You can access here only after verify the token</h2> */}
			<button className="big-button"
				onClick={() => {
					logout();
					navigate('/')
				}}
			>
				logout
			</button>
			<span><h2>Total: ${total}</h2></span>

			{total > 500 ? 
        <p style={{color:"green"}}>Freeshipping</p> :       
        <p style={{color:"red"}}>Shipping will be charged</p>}

		<div className="wrapper">
				{cart && cart.map( (item, i) => {
					return (
						<div key={i} className="card">
							<img alt='productImage' className="img-grid" src={item.photo} />
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

export default Cart;
