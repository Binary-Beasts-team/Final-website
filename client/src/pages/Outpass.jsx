import React from 'react'
import './../css/Outpass.css'
import { Link } from "react-router-dom";
import VerticalNavbar from '../components/verticalNavbar';
import Navbar from './../components/Navbar';  
import ProgressBar from '../components/progressBar';

const Outpass = () => {
    return (
        <>
            <section>
                <Navbar />
                <div className="wrapper">
                    <VerticalNavbar />
                    <div className="main_content">
                        <ProgressBar />
                        <div className="info">
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Outpass; 