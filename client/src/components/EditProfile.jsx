import React from 'react';
import "./editProfile.css";
import {Link} from "react-router-dom"

function EditProfile() {
  return (
    <div className="card editPopup">
        <h5 className="card-title editProfCardTitle">EDIT PROFILE</h5>
        <div className="editContainer">
            <div className="profKeyBox">
                <span className='keyItem'>Username</span>
                <span className='keyItem'>Registration No.</span>
                <span className='keyItem'>Email Id</span>
                <span className='keyItem'>Contact No.</span>
                <span className='keyItem'>Faculty Advisor</span>
            </div>
            <div className="profValueBox">
                <span className=' listItem'>
                    <input type="text" className='form-control' placeholder="Username" />
                </span>
                <span className=' listItem'>
                    <input type="text" className='form-control' placeholder="Reg. No" />
                </span>
                <span className=' listItem'>
                    <input type="text" className='form-control' placeholder="Email" />
                </span>
                <span className=' listItem'>
                    <input type="text" className='form-control' placeholder="Cantact" />
                </span>
                <span className=' listItem'>
                    <input type="text" className='form-control' placeholder="Faculty Adv" />
                </span>
            </div>
        </div>
        <div className="saveButtons">
            <Link to="" class="btn btn-success saveBtn" target="_blank">Save</Link>
            <Link to="" class="btn btn-danger cancelBtn" target="_blank">Cancel</Link>
        </div>
    </div>
  )
}

export default EditProfile