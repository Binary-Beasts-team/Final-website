import React from 'react'
import "../css/profile.css"
import {MdVerified} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"

function Profile() {
  return (
    <div className='profile'>
        <img src="/images/coverpic.jpg" alt="" className="coverPic" />

        <img src="/images/user.jpg" alt="" className="userPic" />
        <AiFillEdit className='profPicEdit'/>

        <h4 className="profileName">John Doe</h4>

        <hr className='phr'/>
        <h4 className="urAccText">Your Account</h4>
        <div className="profileInfoBox">
            <div className="profileKeyBox">
                <span className='username keyItem'>Username</span>
                <span className='regNo keyItem'>Registration No.</span>
                <span className='userEmail keyItem'>Email Id</span>
                <span className='contactNo keyItem'>Contact No.</span>
                <span className='advisor keyItem'>Faculty Advisor</span>
                <span className='advisor keyItem'>Password</span>
            </div>
            <div className="profileValueBox">
                <span className='username listItem'>johnDoe231</span>
                <span className='regNo listItem'>20bcs070</span>
                <span className='userEmail listItem'>20bcs070@iiitdwd.ac.in</span>
                <span className='contactNo listItem'>9087654321</span>
                <span className='advisor listItem'>Dr. Prabhu Prasad</span>
                <span className='advisor listItem'>***********</span>
            </div>
            <div className="profileIconBox">
                <span className='edit profileIcons'><AiFillEdit style={{ color: "blue" }}/></span>
                <span className='profileIcons'><MdVerified style={{ color: "green" }}/></span>
                <span className='profileIcons'><MdVerified style={{ color: "green" }}/></span>
                <span className='edit profileIcons'><AiFillEdit style={{ color: "blue" }}/></span>
                <span className='profileIcons'><MdVerified style={{ color: "green" }}/></span>
                <span className='edit profileIcons'><AiFillEdit style={{ color: "blue" }}/></span>
            </div>
        </div>
        <hr className='phr' />
    </div>
  )
}

export default Profile