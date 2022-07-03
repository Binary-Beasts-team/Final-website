import React from 'react';
import "./OutpassCard.css";
import {Link} from "react-router-dom";
import ApproveOutpass from './approveOutpass';
import { useState, useEffect } from 'react';

function OutpassCard({name ,regNo, id, status,dol,dor,reason,destination}) {
  const [display, setdisplay] = useState(false);
  const handleOnCilck = () =>{
    
  }
  // console.log(data);
  return (
    <>
    <div className="card">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            <h5 className="card-title">O U T P A S S</h5>
            <hr /> <hr /> <br />
            <p className="card-text"><span className='outpassTitle'>Outpass ID:</span><span className='outpassTitletext'>{id&&id}</span></p>
            <p className="card-text"><span className='outpassTitle'>Name:</span><span className='outpassTitletext'>{name&&name}</span></p>
            <p className="card-text"><span className='outpassTitle'>Reg No:</span><span className='outpassTitletext'>{regNo&&regNo}</span></p>
        </div>

        <button class="btn btn-primary downloadBtn" onClick={handleOnCilck}>Open Outpass</button>
     </div>
    </>
  )
}

export default OutpassCard