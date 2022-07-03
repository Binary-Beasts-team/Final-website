import React from 'react';
import "./approveOutpass.css";
import queryString from "query-string";
import {MdPendingActions} from "react-icons/md";
import axios from "axios";
import { toast } from 'react-toastify'
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";


function ApproveOutpass(data) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { name ,regNo, id, status,dol,dor,reason,destination } = queryString.parse(search);
  const handleApprove = async() =>{
    const loadToast = toast.loading("Processing...")
    try {
      const userData = JSON.parse(localStorage.getItem('userInfo'));
      console.log(userData);
      const res = await axios.put(
          `/api/outpass/${id}`,
          {
              fid:userData._id,
              approved:true              
          });
          toast.dismiss(loadToast);
          if (res) {
          toast.success("sent the verification email to your registered email address !!");
          console.log("sent the verification email to your registered email address !!");
          navigate('/user/outpass')
        }
      } catch (error) {
        toast.dismiss(loadToast);
        toast.error("something went wrong cheack your internet connection!!")
        navigate('/user/outpass')
  }
  }

  const handleDecline = async() =>{
    const loadToast = toast.loading("Processing...")


    try {
      const userData = JSON.parse(localStorage.getItem('userInfo'));
      const res = await axios.put(
          `/api/outpass/${id}`,
          {
              fid:userData._id,
              approve:false              
          });

      toast.dismiss(loadToast);

      if (res) {

          toast.success("sent the verification email to your registered email address !!");
          console.log("sent the verification email to your registered email address !!");
      }
  } catch (error) {
    
      toast.dismiss(loadToast);

      toast.error("something went wrong cheack your internet connection!!")
  }
  }


  return (
    <>
    <div className="approvalContainer">

    <div className="card ApproveOutpassCard">
        {/* <img src="..." className="card-img-top" alt="..."/> */}
        <div className="card-body">
            <h5 className="card-title ApproveOutpassCardTitle">O U T P A S S</h5>
            <hr /> <hr /> <br />
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Name:</span>{name}</p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Reg. No:</span>{regNo} </p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Outpass ID:</span> {id} </p>
            <p className="card-text approvedOutpassCardText"><span className='outpassTitle'>Current Status:</span>
            
            {status}<MdPendingActions className='statusIcon'/> </p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Date of Leaving:</span>{dol}</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Date of Returning:</span>-04-2022{dor}</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Reason:</span>{reason}</li>
            <li className="list-group-item listGrpItem"><span className='outpassTitle'>Destination:</span>{destination}</li>
        </ul>
          <div className="choiceButtons">
            <button  class="btn btn-success approvalBtn" target="_blank" onClick={handleApprove}>Approve</button>
            <button  class="btn btn-danger rejectBtn" target="_blank" onClick={handleDecline}>Decline</button>
          </div>
      </div>
    </div>
    </>
  )
}

export default ApproveOutpass;