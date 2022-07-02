import React from 'react';
import "./OutpassCard.css";
import {MdPendingActions} from "react-icons/md";
import {Link} from "react-router-dom";

function OutpassCard() {
  return (
    <>
    <div className="card">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            <h5 className="card-title">O U T P A S S</h5>
            <hr /> <hr /> <br />
            <p className="card-text"><span className='outpassTitle'>Name:</span>Keshav Jha </p>
            <p className="card-text"><span className='outpassTitle'>Outpass ID:</span> O193212K34 </p>
            <p className="card-text"><span className='outpassTitle'>Current Status:</span>
            
            Pending for Approval at your Hostel Warden. <MdPendingActions className='statusIcon'/> </p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className='outpassTitle'>Applied On:</span>24-03-2022</li>
            <li className="list-group-item"><span className='outpassTitle'>Date of Leaving:</span>26-03-2022</li>
            <li className="list-group-item"><span className='outpassTitle'>Date of Returning:</span>04-04-2022</li>
            <li className="list-group-item"><span className='outpassTitle'>Reason:</span>Summer Break</li>
            <li className="list-group-item"><span className='outpassTitle'>Destination:</span>Patna</li>
        </ul>
        <Link to="" class="btn btn-primary" target="_blank">Download Outpass</Link>
    </div>
    </>
  )
}

export default OutpassCard