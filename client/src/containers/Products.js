import React, {useState, useEffect}  from 'react';
import axios from "axios";
import { URL } from "../config";
import SubProduct from './SubProduct'

function Products () {

    const [category, setCategory] = useState([])
    const [product, setProduct] = useState(null)
    const [singlecategory, setSinglecategory] = useState(null)
    const [fruit, setFruit] = useState('')

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