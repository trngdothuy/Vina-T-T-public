import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom'

// import "./styles.css";

function Home() {
    // const location = useLocation()
    const navigate = useNavigate()
// const handleClick = () => console.log('handle click fn called!');

return (
    <div className="home-block">
        <div class="bg-textbox">
            <h1>Vina T&T</h1>
    <h2>We commit that the <i>quality</i>, <i>quantity</i>, <i>moisture</i> as well as <i>technical components</i> meet the demand on each exported order.</h2>
    <button type= "button" onClick={()=>navigate('/factorytour')}>Let's see more</button>
        </div>

    
    </div>
);
}

export default Home;
