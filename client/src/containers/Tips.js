import React, {useState, useEffect}  from 'react';
import {useLocation, useNavigate} from 'react-router-dom'

const Tips = () => {
    let navigate = useNavigate()
    const tips = [
        {img: "https://vinatt.com/en/wp-content/uploads/2019/05/chom-chom.jpg", tit: "Do you know the secret of Vina T&T product?", content: "All of the fruits which are exporting must meet the standard HACCP, GLOBALGAP, ETC. Dragon Fruit, Durian, Longan, Star Apple,[...]"},
        {img: "https://vinatt.com/en/wp-content/uploads/2019/06/1-bo-nong-nghiep-my-ca-ngoi-qua-thanh-long.jpg", tit: "How to be more healthy just by eating?", content: "Eating a healthy, balanced diet can help protect your health. Canada’s Food Guide recommends eating a variety of vegetables and fruit [...]"},
        {img: "https://www.tasteofhome.com/wp-content/uploads/2018/01/shutterstock_330009467.jpg", tit: "The easiest way to preserve your tropical fruits", content: "Tropical fruits, like bananas or mangos, should be stored at higher temperatures, like on your counter, since it grew in a hot place[...]"},
        {img: "https://aumswow.com/life-veda/assets/images/ingredients/star-fruit.jpg", tit: "Have you ever tried this type of fruit?", content: "Carambola, also known as star fruit, is the fruit of Averrhoa carambola, a species of tree native to tropical Southeast Asia[...]"},
        {img: "https://vinatt.com/en/wp-content/uploads/2019/06/2-bo-nong-nghiep-my-ca-ngoi-qua-thanh-long.jpg", tit: "The US Department of Agribulture praised the dragon fruit", content: "Last March 18, the official fanpage on Facebook of the US Department of Agriculture (USDA) published an article introducing dragon fruit[...]"},
        {img: "http://migrationology.smugmug.com/Blog-Posts/i-NNNWTKT/0/640x480/durian-fruit-4-640x480.jpg", tit: "How durian taste like?", content: "Durian lovers say it has a sweet, custardy taste, with the texture of creamy cheesecake. Flavors often attributed to the durian fruits are caramel[...]"},
        {img: "https://static.india.com/wp-content/uploads/2022/05/Lychee.jpg", tit: "Have you ever heard about this benefit of lychee?", content: "It is rich in iron, copper, manganese, phosphorus, and magnesium, which improve bone and heart health. Lychees are a rich source[...]"},
        {img: "https://cef.vn/wp-content/uploads/2020/03/hong.jpg", tit: "What is the specialities of vietnamese mango among other countries?", content: "Xoai is the Vietnamese term for mango. Vietnam is ranked 14th in world production of mangoes, and the fruit is one of the majorly produced in the country[...]"},
        {img: "https://images.immediate.co.uk/production/volatile/sites/30/2017/08/coconut-water-bb9cfe8.jpg", tit: "Coconut water – ‘Savior’ in The Menstrual Period", content: "Before the menstrual period, women often have some symptoms such as back pain, chest tightness, always feel uncomfortable[...]"}
    ];
    const [email, setEmail] = useState()

    function handleChange(e) {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        // debugger
        e.preventDefault(); 
        console.log(email)
        // if (!email.includes("@")) {
        //     return alert("Please insert a valid email")
        // } else {
            alert(`Thank you for keep in touch! We will send an inbox to your email: ${email}`)
        
    }

    return (
        <>
        <h1>Tips Page</h1>
        <h3>Here we answer all your common inqueries!</h3>
        <div className="column3-box">
            {
            tips.map((ele, i) => {
            return (
            <div key={i} className="tips-section">
                <img alt='productImage' className="img-testimonal" src={ele.img} />
                <h3>{ele.tit}</h3>
                <p>{ele.content}</p> 
            </div>) })}
        </div>
        
        <div className="phototextbox">
            <div className="intouch-card">
                
            <h2>Keep in touch to receive more tips from us!</h2>
            <form onSubmit={handleSubmit}>
                <input className="intouch-input" type="email" placeholder="Email" onChange={handleChange}/>
                <button className="big-button">Submit</button>
            </form>
            </div>
        
            <div className="intouch-card">
            <h2>Or if you are still in doubt?</h2>
            <button className="big-button" type="button" onClick={()=>navigate('/contact-us')}>Contact Us</button>
            </div>
        </div>
        </>
    )
}




export default Tips;