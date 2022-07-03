import React from 'react';
import "./approveOutpass.css";
import {MdPendingActions} from "react-icons/md";
import {Link} from "react-router-dom";

function ApproveOutpass() {
  return (
    <>
    <div className="card ApproveOutpassCard">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            <h5 className="card-title ApproveOutpassCardTitle">O U T P A S S</h5>
            <hr /> <hr /> <br />
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Name:</span>Keshav Jha </p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Reg. No:</span>20bcs070 </p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Outpass ID:</span> O193212K34 </p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Current Status:</span>
            
            Pending for Approval at Faculty Advisor. <MdPendingActions className='statusIcon'/> </p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Applied On:</span>24-03-2022</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Date of Leaving:</span>26-03-2022</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Date of Returning:</span>04-04-2022</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Reason:</span>Summer Break</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Destination:</span>Patna</li>
        </ul>
          <div className="choiceButtons">
            <Link to="" class="btn btn-success approvalBtn" target="_blank">Approve</Link>
            <Link to="" class="btn btn-danger rejectBtn" target="_blank">Decline</Link>
          </div>
    </div>
    </>
  )
}

export default ApproveOutpass;