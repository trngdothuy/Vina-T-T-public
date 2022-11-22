import React, {useState, useEffect}  from 'react';
import axios from "axios";
import { URL } from "../config";

function Products () {

    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [singlecategory, setSinglecategory] = useState([])

              console.log(singlecategory) 
            //   console.log(product)  
    const [fruit, setFruit] = useState('')
    
      const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from reloading onSubmit which is default behavior
        // console.log(fruit)
        // alert(fruit)
        const findProduct = async product => {
            try {
              const res = await axios.get(`${URL}/product/:product_id`);
            //   console.log(res)
              setProduct(res.data.data)
            //   console.log(res.data.data)
            } catch (error) {
              console.log(error);
            }
          }
          findProduct(fruit);

        function findSinglecategory () {
            let index = category.findIndex((element) => element.category === product.category) 
            setSinglecategory(category[index])
        } 
        findSinglecategory()
      };
    
      const handleChange = (e) => {
        // data is a string form the input
        // setting the content of input to be the value of 'userInput' in state
        setFruit(e.target.value);
      };

      useEffect(() => {
        const findCategory = async category => {
          try {
            const res = await axios.get(`${URL}/category/`);
            console.log(res)
            setCategory(res.data.data)
            console.log(res.data.data)

          } catch (error) {
            console.log(error);
          }
        }
        findCategory();
      }, []);


return (
    <div class="top-textbox">
        <h1>Products</h1>
        <h2>Only providing the <strong>highest-quality</strong> fruits.</h2>


    <div className="product-box">
    {
     category.map((cate, i) => {
      return (
      <div key={i} className="product">
          <img className="img-grid" alt='productImage' src={cate.photo} />
          <p>{cate.category}</p> 
       </div>) })}
    </div>
    
    <form onSubmit={handleSubmit}>
    <input onChange={handleChange} type="text" className="input-box" placeholder="Insert a number from 00 - 10"/>
    <button>Search</button>
    </form>

    <>
    <p>Name: {product.category}</p>
    <p>ID: {product.fruit_batch}</p>
    <p>Farmer's name: {product.farmers_name}</p>
    <p>Farmer's photo: {product.farmers_photo}</p>
    <p>Harvest Date: {product.harvest_date}</p>
    <p>Packaging Date: {product.packaging_date}</p>
    <p>Video: {product.videos}</p>
    <img className="img-grid" alt='productImage' src={singlecategory.photo} />
    </>

    </div>


);

}

export default Products;