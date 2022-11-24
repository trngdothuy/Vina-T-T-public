import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'

const Factorytour = () => {
    let navigate = useNavigate()
    const gallery = [
        {name: "Mekong Delta", photo: "https://vinatt.com/en/wp-content/uploads/2019/06/DJI_0123-095.jpg"},
        {name: "Our Happy Workers", photo: "https://media.istockphoto.com/id/1219477326/photo/smiling-old-vietnamese-couple-on-a-farm-with-conical-hats.jpg?s=612x612&w=0&k=20&c=G2nI3FYuHzPkAYBlCTpX9p-EtYMs4rTktM46Ujf44U0="},
        {name: "Machinery", photo: "https://image.made-in-china.com/2f0j00SvJGOUAsPhoe/Citrus-Juice-Processing-Line-Orange-Juice-Processing-Plant.jpg"},
        {name: "Farming Area", photo: "http://demo.asianalink.com/wp-content/uploads/2020/08/1-dragon-fruit-long-an.jpg"},
        {name: "Harvesting Process", photo: "https://cdnimgen.vietnamplus.vn/uploaded/wbxx/2019_05_22/fruit_farmers.jpg"},
        {name: "Working Area", photo: "https://www.itfnet.org/v1/wp-content/uploads/2020/02/vietnam2-1.jpg"},
        {name: "Cleaning Process", photo: "https://www.tropicalfood.net/wp-content/uploads/2019/08/top_mobile_linea_estrazione_mango.jpg"},
        {name: "Smart Factory", photo: "http://www.smartmanufacturingtoday.com/wp-content/uploads/2022/04/Fruit-packing-PIC-701x467.jpg"},
        {name: "Packaging Process", photo: "https://www.goodfruit.com/wp-content/uploads/giftInsideAmazon-16908tj-1.jpg"},
        {name: "Exhibition Room", photo: "https://c8.alamy.com/comp/2H5378Y/shanghai-6th-nov-2021-fruits-are-on-display-at-the-food-and-agricultural-products-exhibition-area-of-the-4th-china-international-import-expo-ciie-in-east-chinas-shanghai-nov-6-2021-various-foods-from-around-the-world-are-showcased-during-the-4th-ciie-in-shanghai-credit-hao-zhaoxinhuaalamy-live-news-2H5378Y.jpg"},
        {name: "Test Lab", photo: "http://cen.acs.org/content/dam/cen/100/1/WEB/10001-feature2-lab.jpg"},
        {name: "Process Management", photo: "https://www.foodengineeringmag.com/ext/resources/Issues/2020/01-January/Food-safety.jpg?1578694863"},
    ],
    cert = [
        {}
    ];


    

return (
    <>
    <div className="factory-block"></div>
        <div class="bg-textbox">
        <h1>Factory Tour</h1>
        <h3>Welcome to our virtual factory tour!</h3>
    </div>
    <div className="factory-section">
        <div className="factory-textbox">
            <h5>Vina T&T Factory Tour</h5>
            <h2>Let's travel to Mekong Delta and visit our factory</h2>
            <h6>The quality of our products is not only the result of state-of-the-art technology. It is a result, above all, of the passion of a team of professionals who ensure every last detail has been covered, resulting in an excellent product. Come and see for yourself at our factory.</h6>
        </div>
            <img alt='factory' className="factory-banner" src='https://vietnamtimes.org.vn/stores/news_dataimages/dieuhuongvnt/032021/25/07/4420_1.png?rt=20210325075039'/>
    </div>
    <div className="factory-section">
        
            <img alt='farmer' className="factory-banner" src='https://www-file.huawei.com/-/media/corp2020/images/tech4all/cases1/1/guangxi-fttr-video-cv.jpg'/>
     
        <div className="factory-textbox">
            <h5>Virtual Factory Tour</h5>
            <h2>The heart of Vina T&T</h2>
            <h6>We want to show you the true value of our products, by unveiling 
             the production process of a fruit, and revealing life inside the factory and farms.</h6>
        </div>
    </div>
    <div className="factory-section">
        <img alt='farmer' className="factory-long-banner" src='https://vietnamtimes.org.vn/stores/news_dataimages/khanhduongvnt/052021/27/09/thumbnail/1817_vai_thieu_luc_ngan_8_1-2104.png?rt=20210527091818'/>
    </div>

    <h1>Our Factory and Farm</h1>
    <h3>The health and safety of our employees, customers and partners remain our number one priority</h3>

    <div className="product-box">
    {
     gallery.map((ele, i) => {
      return (
      <div key={i} className="product">
          <img className="img-grid" alt='productImage' src={ele.photo} />
          <p>{ele.name}</p> 
       </div>) })}
    </div>
    <h1>Our Quality Certifications</h1>
    <h3>All of our fruits must meet the international standards</h3>
    <img alt='productImage' src="https://vinatt.com/en/wp-content/uploads/2020/08/GLOBALGAP-LOGO-226x135.jpg"/>
    <img alt='productImage' src="https://vinatt.com/en/wp-content/uploads/2020/08/ISO-9001-2015-LOGO-226x135.jpg"/>
    <img alt='productImage' src="https://vinatt.com/en/wp-content/uploads/2020/08/HAACP-LOGO-226x135.jpg"/>
    <img alt='productImage' src="https://vinatt.com/en/wp-content/uploads/2020/08/VINAFRUIT-LOGO-226x135.jpg"/>
    <img alt='productImage' src="https://vinatt.com/en/wp-content/uploads/2020/08/CAPAVN-LOGO-226x135.jpg"/>


    <button type= "button" className="spec-button" onClick={()=>navigate('/products')}>See more</button>
</>
)
}


export default Factorytour;