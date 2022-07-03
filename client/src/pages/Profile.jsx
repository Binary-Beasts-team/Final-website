import "../css/profile.css"
import {MdVerified} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import {useEffect, useState} from "react";
import {useParams} from "react-router";

import axios from "axios";

function Profile() {

    const [student, setStudent] = useState({});
    const [facultyAdv, setFacultyAdv] = useState("NOT SET");
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    let id = userData._id
    //fetch details from backend
    useEffect(()=>{
        async function fetchData(){

            //Fetch Student
            var stud = await axios.get(`api/student/${id}`);
            setStudent(stud.data);

            //Fetch faculty Advisor of the student
            var facAdv = await axios.get(`api/faculty/${stud.data.facultyAdvisor}`);
            setFacultyAdv(facAdv.data.name);
        };
        fetchData();
    },[id])

    const ifempty = (detail)=>{
        if(detail == ""){
            return "-----------"
        }else{
            return detail
        }
    }

  return (
    <div className='profile'>
        <img src="/images/coverpic.jpg" alt="" className="coverPic" />

        <img src={student.dpLink || "/images/user.jpg"} alt="" className="userPic" />
        <AiFillEdit className='profPicEdit'/>

        <h4 className="profileName">{student.name}</h4>
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
                <span className='username listItem'>{ifempty(student.username)}</span>
                <span className='regNo listItem'>{ifempty(student.regNo)}</span>
                <span className='userEmail listItem'>{ifempty(student.email)}</span>
                <span className='contactNo listItem'>{ifempty(student.contactNo)}</span>
                <span className='advisor listItem'>{ifempty(facultyAdv)}</span>
                <span className='advisor listItem'>***********</span>
            </div>
            <div className="profileIconBox">
                <span className='profileIcons'><AiFillEdit className="editIcon"/></span>
                <span className='profileIcons'><MdVerified  className="verifiedIcon"/></span>
                <span className='profileIcons'><MdVerified className="verifiedIcon"/></span>
                <span className='profileIcons'><AiFillEdit className="editIcon"/></span>
                <span className='profileIcons'><AiFillEdit className="editIcon"/></span>
                <span className='profileIcons'><AiFillEdit className="editIcon"/></span>
            </div>
        </div>
        <hr className='phr' />
    </div>
  )
}

export default Profile