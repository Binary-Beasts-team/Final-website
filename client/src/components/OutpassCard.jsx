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
            <p className="card-text"><span className='outpassTitle'>Outpass ID:</span><span className='outpassTitletext'>O193212K34</span></p>
            <p className="card-text"><span className='outpassTitle'>Name:</span><span className='outpassTitletext'>Brij Vaghani</span></p>
            <p className="card-text"><span className='outpassTitle'>Reg No:</span><span className='outpassTitletext'>20BCS033</span></p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className='outpassTitle'>Applied On:</span>24-03-2022</li>
        </ul>
        <Link to="" class="btn btn-primary downloadBtn" target="_blank">Download Outpass</Link>
    </div>
    </>
  )
}

export default OutpassCard