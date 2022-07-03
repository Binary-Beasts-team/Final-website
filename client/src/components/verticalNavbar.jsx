import React from 'react'
import './verticalNavbar.css'
import { Link } from "react-router-dom";


const verticalNavbar = () => {
    return (
        <>
            <section>
                <div className="sidebar">
                    <h2>Dashbord</h2>
                    <ul>
                        <li><Link to="/profile"><i className="fas fa-user" />Profile</Link></li>
                        <li><Link to="/outpass/form"><i className="fas fa-address-card" />Create request</Link></li>
                        <li><Link to="/user/outpass"><i className="fas fa-project-diagram"></i>Outpass</Link></li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default verticalNavbar