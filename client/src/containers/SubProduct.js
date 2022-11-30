import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const SubProduct = ({singlecategory, product, inputIsNumber}) => {

    const navigate = useNavigate()
    console.log(singlecategory)
    // console.log(product)
    // console.log(props)
    // you can see that props is an object
    // and we can use destructuring 
    return <>
    {
    product && 
    <div className="display-section">
    
        <div className="phototextbox">  
                <img className="img-textbox" alt='productImage' src={product.videos} />
            <div className="textbox">
                <p><i>{singlecategory.description}</i></p>
                <p><strong>Name</strong>: {singlecategory.category}</p>
                <p><strong>Color</strong>: {singlecategory.color}</p>
                <p><strong>Manufacturer</strong>: {singlecategory.manufacturer}</p>
                <p><strong>Plantation</strong>: {singlecategory.plantation}</p>
                </div>
        </div>
    
        {(inputIsNumber) &&
        <div className="phototextbox"> 
                    <div className="textbox">
                        <p><strong>Fruit Batch</strong>: {product.fruit_batch}</p>
                        <p><strong>Farmer's Name</strong>: {product.farmers_name}</p>
                        <p><strong>Harvest Date</strong>: {product.harvest_date}</p>
                        <p><strong>Packaging Date</strong>: {product.packaging_date}</p>
                    </div>
                        <img className="img-textbox" alt='productImage' src={product.farmers_photo} />
                </div>
        }
        
    
        <div className="normaltextbox">
            <h3>Nutrient Table</h3>
            <p><i>per 100g(3.5oz)</i></p>
            {singlecategory && singlecategory.nutrients.map((cate, i) => <div key={i} className="table">
                        <p>{cate.key}:</p> 
                        <p>{cate.value}</p> 
                    </div> )
            }
        </div>
        
        <div className="normaltextbox">
            <h3>Testimonials</h3>
            <div className="column3-box">

                <div className="testti-card">
                    <div className="text-card">
                        <p className="testimonal-text">{singlecategory.testimonial1}</p>
                        <p className="testimonal-text"><i>_{singlecategory.testimonial_name1}_</i></p>
                    </div>
                    <img className="img-testimonal" alt='productImage' src={singlecategory.testimonial_photo1} />
                </div>

                <div className="testti-card">
                    <img className="img-testimonal" alt='productImage' src={singlecategory.testimonial_photo2} />
                    <div className="text-card">
                        <p className="testimonal-text">{singlecategory.testimonial2}</p>
                        <p className="testimonal-text"><i>_{singlecategory.testimonial_name2}_</i></p>
                    </div>
                </div>

                <div className="testti-card">
                    <div className="text-card">
                        <p className="testimonal-text">{singlecategory.testimonial3}</p>
                        <p className="testimonal-text"><i>_{singlecategory.testimonial_name3}_</i></p>
                    </div>
                    <img className="img-testimonal" alt='productImage' src={singlecategory.testimonial_photo3} />
                </div>
                <button className="button-3columns" type= "button" onClick={()=>navigate('/tips')}>More tips?</button>
            </div>
        </div>
       
         
    </div>
    }
        </>
 
}
export default SubProduct