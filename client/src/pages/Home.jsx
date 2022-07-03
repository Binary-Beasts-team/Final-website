import React from 'react'
import "../css/home.css";
import mgmt from "../css/images/management.png"

function Home() {
  return (
    <div className='home'>
      <div className="homeWrapper">
        <div className="homeLeft">
          <img src={mgmt} alt="" />
        </div>
        
        <div className="homeRight">
          <span className="homeDescriptn">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur sequi tempore omnis, laudantium mollitia temporibus iure. Incidunt quaerat ad maiores velit repellat quo inventore nemo, recusandae accusamus vero nihil maxime iusto animi deleniti!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam facere sequi asperiores quis dignissimos perferendis amet sit nostrum sint, eum mollitia earum similique!
          </span>
          <button className="getOutpassBtn btn btn-primary animate__bounceIn">Apply for Outpass</button>
        </div>
      </div>
    </div>
  )
}

export default Home
