import React, {useState, useEffect}  from 'react';
import axios from "axios";
import { URL } from "../config";
import SubProduct from './SubProduct'
import { calculateJwkThumbprint } from 'jose';
// import Account from './Account'
// import App from '../App';

function Products ({cart, setCart, findProduct, setCategory, category, singlecategory, product}) {

    // const [category, setCategory] = useState([])
    // const [product, setProduct] = useState(null)
    // const [singlecategory, setSinglecategory] = useState(null)
    const [fruit, setFruit] = useState('')
     //const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [order, setOrder] = useState(0)

    // const [cart,setCart] = useState({})
    // console.log('this is cart from the 1st line')
    // console.log(cart) 
    console.log('this is order')
    console.log(order)

    // console.log('this is category');
    // console.log()
    // console.log( "this is single cate")
    // console.log(singlecategory) 
    // console.log("this is product")
    // console.log(product)       
        
    

    const handleSubmit = (e) => {
    e.preventDefault(); 
    findProduct(fruit);
    };

    const handleChange = (e) => {
    setFruit(e.target.value);
    // console.log("this is input" + fruit)
    };

    useEffect(() => {
    const findCategory = async () => {
        try {
        const res = await axios.get(`${URL}/category/`);
        // console.log(res)
        setCategory(res.data.data)
        // console.log(res.data.data)

        } catch (error) {
        console.log(error);
        }
    }
    findCategory();
    }, []);

  
    const handleClickCart = (e) => {
        // debugger
        // e.preventDefault(); 
        // console.log('this is click cart')
        // console.log(e) // name of product
        // find product with name in the category
        let cart2 = [...cart]
        if (cart2.find(ele => ele.name === order.name)) {
            let index = cart2.findIndex(ele => ele.name === order.name) 
            cart2[index] = order           
            setCart(cart2)
        } else {
            setCart([...cart, order])
        }
        // console.log('this is order after click') 
        // console.log(cart);
        // edit state 
        // the cart 
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(localStorage)
    };
    
    const handleChangeCart = (e) => {
        // debugger
        // e.preventDefault();
        // setCart({...cart, (e.target.name): e.target.value, price: e.target.id})
        // setCart({})
        setOrder({name: (e.target.className), quantity: Number(e.target.value), price: Number(e.target.name), photo: (e.target.id)})
        console.log('this is order') 
        console.log(order)
        console.log(e) 
        // console.log(e.target.name) // name of product
        //console.log(e.target.value) // quantity of item
       // setOrder({name: e.target.name, quantity: e.target.value})
    };

return (
    <div className="top-textbox">
        <h1>Products</h1>
        <h3>Only providing the <strong>highest-quality</strong> fruits.</h3>
    <div className="product-box">
    {
     category.map((cate, i) => {
      return (
        <div key={i} className="product">
            <img className="img-grid" alt='productImage' src={cate.photo} />
            <p>{cate.category}</p> 
            <div className="hidden">
                <p>Price/kg: ${cate.price}</p>
                <p>Quantity:  
                <select className={cate.category} name={cate.price} id={cate.photo} onChange={handleChangeCart}>
                    <option value="0">kg</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select></p>
                
                <button className="big-button" onClick={()=>handleClickCart(cate.category, cate.value, cate.price, cate.photo)}>Add to cart</button>
            </div>
       </div>) })}
    </div>
    
    <form onSubmit={handleSubmit}>
    <input onChange={handleChange} type="text" className="input-box" placeholder="Insert a number from 01 - 10"/>
    <button className="big-button">Search</button>
    </form>

    {(singlecategory  && product)  && <SubProduct product={product} singlecategory={singlecategory}/>}
  
    </div>
);

}

export default Products;