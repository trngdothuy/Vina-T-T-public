import React, { useEffect } from 'react';
import axios from "axios";

function ContactUs (props) {

    // const handleSubmit = (e) => {
    //     e.preventDefault(); 
    //     };
    
        // const handleChange = (e) => {
        // setFruit(e.target.value);
        // console.log("this is input" + fruit)
        // }

    function handleSubmit(event) {
        event.preventDefault();
        const firstNameInput = event.target.elements.firstname;
        const lastNameInput = event.target.elements.lastname;
        const emailInput = event.target.elements.email;
        const phoneInput = event.target.elements.phone;
        const addressInput = event.target.elements.address;
        const subjectInput = event.target.elements.subject;
        const messageInput = event.target.elements.message;

        var data = { firstname: firstNameInput.value, lastname: lastNameInput.value, email: emailInput.value, phone: phoneInput.value, address: addressInput.value, message: messageInput.value, subject: subjectInput.value };
        // console.log("--data--", name: event.target.elements.name.value, event.target.elements.email.value, event.target.elements.message.value)
    
        // sending request to localhost, in production could be just /sendEmail
        const sendEmail = async email => {
            const res = await axios
                .post('http://localhost:3040/emails/send_email', data)
                .catch(function (error) {
                console.log(error);
                });
                console.log("res: ", res)
                firstNameInput.value = '';
                lastNameInput.value = '';
                phoneInput.value = '';
                addressInput.value = '';
                subjectInput.value = '';
                emailInput.value = '';
                subjectInput.value ='';
                messageInput.value = '';
                alert('Your message has been sent, thanks!');
                console.log('--SeNd!--');
            };
        sendEmail()

        }


return (
    <>
<h1>Contact Us Page</h1>
<h3>Do you have any questions? Don't hesitate to contact us!</h3>

<div className="phototextbox">  
<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7838.485989032036!2d106.677848!3d10.792692!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x14890126714d21cd!2sVINA%20T%26T%20GROUP!5e0!3m2!1svi!2sus!4v1669219588764!5m2!1svi!2sus" width="100%" height="100%" style={{border:0}}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

    <div className="textbox">
    <h2>VINA T&T IMPORT EXPORT TRADING SERVICE CO., LTD</h2>

    <p><i>Address:</i> 79 Tran Huy Lieu Ward 12, Phu Nhuan District, Ho Chi Minh City</p>
    <p><i>Home Phone:</i> +84 28 3844 8277 | <i>Mobile:</i> +84 382 96 4474 | <i>Whatsapp :</i> +84 382 96 4474</p>
    <p><i>Email:</i> vinattgroup@vinatt.com</p>
    <p><i>Website:</i>  http://vinatt.com</p>

    <h3>HEAD OFFICE IN USA</h3>
    <p><i>Address:</i> 11760 Slauson Ave, Santa Fe Spring CA 90670</p>
    <p><i>Email: </i>t8construction@hotmail.com</p>
    <p><i>Hotline: </i>++ 1 (626) 3153226 (Mrs. Kim Anh)</p>
    </div>
</div>

<h2>Contact Us </h2>
<form onSubmit={handleSubmit} className="contact-form">
    <input 
        required={true} 
        type="text" 
        className="contact-input" 
        name="firstname" 
        placeholder="First Name"/>
    <input 
        type="text" 
        className="contact-input" 
        name="lastname" 
        placeholder="Last Name"/>
    <input 
        required={true} 
        type="email" 
        className="contact-input" 
        name="email"
        placeholder="Email"/>
    <input 
        type="text" 
        className="contact-input" 
        name="phone"
        placeholder="Phone"/>
    <input 
        type="text" 
        className="contact-input1" 
        name="address"
        placeholder="Address"/>
    <input 
        required={true} 
        type="text" 
        className="contact-input1" 
        name="subject"
        placeholder="What do you want to ask about?"/>
    <textarea 
        required={true} 
        type="text" 
        className="contact-input2" 
        name="message"
        placeholder="Type your message here.."/>
    <p className="button-section">Thanks for contacting us!
    <button className="spec-button">Submit</button></p>
    
    
</form>


</>

)

}




export default ContactUs;