import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../config";
// import categoriesModel from "../../../server/models/categoriesModel";

const PaymentSuccess = (props) => {
  //debugger

  const [data, setData] = useState({})
  const sendEmailConfirm = async data => {

    const res = await axios
        .post('http://localhost:3040/emails/send_email_confirm', data)
        .catch(function (error) {
        console.log(error);
        });
        console.log("res: ", res)
        // alert('Your message has been sent, thanks!');
        console.log('--SeNd!--');
    };

  useEffect(() => {
    const getSessionData = async () => {  
      // 11. Now when payment was successful we need to get back to Stripe to know what was paid for and who is the customer
      try {
        // debugger
        // 12. we get the session id from the localStorage
        const sessionId = JSON.parse(localStorage.getItem("sessionId"));
        // 13. And send request to checkout_session controller to get info from Stripe by session ID
        const response = await axios.get(
          `${URL}/payment/checkout-session?sessionId=${sessionId}`
        );
        console.log("response",response)
        setData({name: response.data.session.customer_details.name, email: response.data.session.customer_details.email, products: props.cart})
        console.log("data", data)
        // Then removing session id from localStorage
        localStorage.removeItem("sessionId");
        // 18. response from the server will contain data for the customer and the session with the order's info
        console.log("== response ==>", response);
        // 19. So from here we continue with whatever action is needed to be done after successful payment
        
        //if you need the products list in this page, you can find them in : response.data.session.display_items or in response.data.session.line_items depends on the version of API you are using
      } catch (error) {
        //handle the error here, in case of network error
        debugger
      }
    };
    getSessionData();
  }, []);

  useEffect(() => {
    if (data.name) {
sendEmailConfirm(data)
    }
    
  }, [data]);


  return (
    <div className="message_container">
      <div style={{ border: "2px solid  #35BFDE" }} className="message_box">
        <div className="message_box_left">
          <img
            alt="smile_icon"
            className="imagePayment"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mr._Smiley_Face.svg/800px-Mr._Smiley_Face.svg.png"
            }
          />
        </div>
        <div style={{ color: "#35BFDE" }} className="message_box_right">
          Thank you for your order!
          <hr></hr>
          You will receive a confirmation email soon.
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
