import React, {useState, useEffect}  from 'react';
import axios from "axios";
import { URL } from "../config";
import SubProduct from './SubProduct'
// import Account from './Account'
// import App from '../App';

function Products ({cart, setCart}) {

    const [category, setCategory] = useState([])
    const [product, setProduct] = useState(null)
    const [singlecategory, setSinglecategory] = useState(null)
    const [fruit, setFruit] = useState('')
     //const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    // const [order, setOrder] = useState(0)

    // const [cart,setCart] = useState({})
    console.log('this is cart at first')
    console.log(cart) 
    // console.log('this is order')
    // console.log(order)

    // console.log('this is category');
    // console.log()
    // console.log( "this is single cate")
    // console.log(singlecategory) 
    // console.log("this is product")
    // console.log(product)       
        
    const findProduct = async product => {
        try {
            const res = await axios.get(`${URL}/product/${product}`);
        //  console.log(res)
            setProduct(res.data.data)
            let index = category.findIndex((element) => element.category === res.data.data.category) 
        setSinglecategory(category[index])
            // console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
        }

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
        console.log(cart);
        // edit state 
        // the cart 
        // localStorage.setItem("cart", JSON.stringify(cart));
        // console.log(localStorage)
    };
    
    const handleChangeCart = (e) => {
        // debugger
        // e.preventDefault(); 
        setCart({...cart, name: (e.target.name), quantity: (e.target.value), price: (e.target.id)}) // why cart only displays 1 selection?
        console.log('this is changed cart') 
        console.log(cart)
        // console.log(e) 
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
                <select name={cate.category} id={cate.price} onChange={handleChangeCart}>
                    <option value="0">kg</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select></p>
                
                <button onClick={()=>handleClickCart(cate.category, cate.value, cate.price)}>Add to cart</button>
            </div>
       </div>) })}
    </div>
    
    <form onSubmit={handleSubmit}>
    <input onChange={handleChange} type="text" className="input-box" placeholder="Insert a number from 01 - 10"/>
    <button>Search</button>
    </form>

    {(singlecategory  && product)  && <SubProduct product={product} singlecategory={singlecategory}/>}
  
    </div>
);

}

export default Products;