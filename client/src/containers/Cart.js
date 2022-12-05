import {useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from "react";
// import { createBrotliCompress } from 'zlib';
import {useStripe} from '@stripe/react-stripe-js';
import axios from 'axios';
import { URL } from "../config";

const Cart = ({cart, setCart, logout}) => {
	let navigate = useNavigate();
	let stripe = useStripe();

	const [total, setTotal] = useState(0)
	const [shipInfo, setShipInfo] = useState()
	const [colorShipInfo, setColorShipInfo] = useState()

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
		localStorage.setItem("cart", JSON.stringify(temp));
            console.log(localStorage)
		}
	
	const handleClickAdd = (i) => {
		let temp = [...cart]
		temp[i].quantity += 1
		// console.log(temp)
		setCart(temp)
		localStorage.setItem("cart", JSON.stringify(temp));
            console.log(localStorage)
		}

	const handleClickDelete = (i) => {
		let temp = [...cart]
		temp.splice(i, 1)
		// console.log(temp)
		setCart(temp)
		localStorage.setItem("cart", JSON.stringify(temp));
            console.log(localStorage)
		}

	
	useEffect(()=>{
	// debugger
	let cart2 = [...cart]
	let prices = cart2.map(e=>e.price*e.quantity)
	if (prices.length !== 0) {
		let subtotal = prices.reduce((a,b)=>a+b)
		setTotal(subtotal<=500?subtotal+5:subtotal)
	} else {
		setTotal(0)
	}	
	},[(cart)]);

	useEffect(()=> {
		if (cart.length === 0) {
			setShipInfo("Your cart is empty")
			setColorShipInfo("red")
		} else if (total > 500) {
			setShipInfo("Freeshipping")
			setColorShipInfo("green")
		} else {
			setShipInfo("Shipping of €5 will be charged")
			setColorShipInfo('red')
		}
	},[]);

	// 1. When we click PAY button this function triggers first 
	const createCheckoutSession = async () => {
console.log(URL)
	try {
		//debugger
		// 2. Sending request to the create_checkout_session controller and passing products to be paid for
		const response = await axios.post(`${URL}/payment/create-checkout-session`, { cart });
		return response.data.ok
		// we save session id in localStorage to get it later
		? (localStorage.setItem('sessionId', JSON.stringify(response.data.sessionId)),
			// 9. If server returned ok after making a session we run redirect() and pass id of the session to the actual checkout / payment form
			redirect(response.data.sessionId))
		: navigate('/payment/error');
	  } catch (error) {
		navigate('/payment/error');
	  }
	};
  
	const redirect = (sessionId) => {
  // 10. This redirects to checkout.stripe.com and if charge/payment was successful send user to success url defined in create_checkout_session in the controller (which in our case renders payment_success.js)
  stripe
  .redirectToCheckout({
		  // Make the id field from the Checkout Session creation API response
		  // available to this file, so you can provide it as parameter here
		  // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
		  sessionId: sessionId
		})
  .then(function (result) {
		  // If `redirectToCheckout` fails due to a browser or network
		  // error, display the localized error message to your customer
		  // using `result.error.message`.
		});
  };
	//=====================================================================================
	//=====================================================================================
	//=====================================================================================

	// useEffect(()=> {
	// 	if (total < 500) {
	// 		setTotal(total + 5)
	// 	}
	// },[total])
	
	return (
		<div className="secret_page">
			<h1>Cart</h1>
			{/* <h2>You can access here only after verify the token</h2> */}
			{/* <button className="big-button"
				onClick={() => {
					logout();
					navigate('/')
				}}
			>
				logout
			</button> */}
			<span><h2>Total: €{total}</h2></span>
			<p style={{color:(colorShipInfo)}}>{shipInfo}</p>



		<div className="wrapper">
				{cart && cart.map( (item, i) => {
					return (
						<div key={i} className="card">
							<img alt='productImage' className="img-grid" src={item.photo} />
							<p>{item.name}</p> 
							<p>€{item.price}</p> 
							<div>
							<button className="button-x"onClick={()=>handleClickMinus(i)}>-</button> 
								{item.quantity}
							<button className="button-x" onClick={()=>handleClickAdd(i)}>+</button>
							</div>
							<p>€{item.price * item.quantity}</p>
							<button className="button-x" onClick={()=>handleClickDelete(i)}>x</button>
						</div> )})
				}
       </div>
		<><button onClick={() => createCheckoutSession()}>Pay</button></>
		</div>
	);
};

export default Cart;
