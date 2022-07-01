import React from 'react'
import './verticalNavbar.css'
import { Link } from "react-router-dom";


const verticalNavbar = () => {
    return (
        <>
            <section>
                <div className="sidebar">
                    <h2>Sidebar</h2>
                    <ul>
                        <li><Link to="/"><i className="fas fa-user" />Profile</Link></li>
                        <li><Link to="/"><i className="fas fa-address-card" />Create request</Link></li>
                        <li><Link to="/"><i className="fas fa-project-diagram"></i>Outpass</Link></li>
                    </ul>
                    <div className="social_media">
                        <Link to="/"><i className="fab fa-facebook-f"></i></Link>
                        <Link to="/"><i className="fab fa-twitter"></i></Link>
                        <Link to="/"><i className="fab fa-instagram"></i></Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default verticalNavbar