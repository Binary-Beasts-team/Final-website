import React from 'react'
import "../css/outpassForm.css"
import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

function OutpassForm() {
    const navigate = useNavigate();

    // useEffect(async() => {
    //     try {
    //         if(!localStorage.getItem('userInfo')){
    //         navigate('/')
    //         }
    //     } catch (error) {
    //         navigate('/')
    //     }
    // }, []);
    const [userOutpassInfo, setuserOutpassInfo] = useState({
        dol: "",
        dor: "",
        reason: "",
        destination: "",
    });
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const handleOutpassChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        setuserOutpassInfo({ ...userOutpassInfo, [name]: val });
    };
    const currentDate = new Date()

    console.log(userOutpassInfo.dol <= currentDate);

    const SaveOutpass = async () => {
        const { dol,dor,reason,destination } = userOutpassInfo;

        if (!dol || !dor || !reason || !destination) {
            toast.error("fill all the fields before sign up!!")
            return;
        }
        const currentDate = new Date()
        if (dol >= dor && dol < currentDate) {
            toast.error("Date of leaving is not valid")
            return;
        }
        try {
            const id = userData._id
            const loadToast = toast.loading("Processing...")
            const res = await axios.post(
                `/api/outpass/${id}`,
                {
                    dol,
                    dor,
                    reason,
                    destination
                });
            toast.dismiss(loadToast);
            if (res) {
                toast.success("Saved the Outpass successfully");
                console.log("Saved the Outpass successfully");
                setuserOutpassInfo({
                    dol: "",
                    dor: "",
                    reason: "",
                    destination: "",
                });
                navigate('/user/outpass')
            }
        } catch (error) {
            toast.error("something went wrong cheack your internet connection!!")
            navigate('/apply')
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();         //prevents reloading page on Submit
    }

    const CancelOutpass = () =>{
        navigate('/user/outpass')
    }

  return (
    <>
    <div className='outerDivForm'>
        <form className='outpassForm'>
            <span className="outpassFormTitle">OUTPASS FORM</span>

            {/* Pre Filled */}
            <fieldset disabled>
                <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Name</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder={userData.name} />
                </div>
                <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Registration No.</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder={userData.regNo}/>
                </div>
            </fieldset>
            <div className="mb-3" onSubmit={handleSubmit}>
                <label className="form-label formKey">Date of Leaving</label>
                <input type="date" required className="form-control formInput" name="dol" value={userOutpassInfo.dol} onChange={handleOutpassChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Date of Returning</label>
                <input required type="date" className="form-control formInput" name="dor" value={userOutpassInfo.dor} onChange={handleOutpassChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Reason</label>
                <input required type="text" className="form-control formInput" name="reason" value={userOutpassInfo.reason} onChange={handleOutpassChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label formKey">Destination</label>
                <input required type="text" className="form-control formInput" name="destination" value={userOutpassInfo.destination} onChange={handleOutpassChange}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" required className="form-check-input" id="exampleCheck1" name="confirm" value={userOutpassInfo.confirm} onChange={handleOutpassChange}/>
                <label className="form-check-label" for="exampleCheck1">I have confirmed the details</label>
            </div>
            <div >
            <div className='btnContainer'>
                <button type="submit" className="btn btn-primary submitBtn" onClick={SaveOutpass}>Apply</button>
            </div>
            <div className='btnContainer'>
                <button type="submit" className="btn btn-primary cancelBtn" onClick={CancelOutpass}>Cancel</button>
            </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default OutpassForm