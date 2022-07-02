import React from 'react'
import './../css/Outpass.css'
import VerticalNavbar from '../components/verticalNavbar';
import ProgressBar from '../components/progressBar';
import OutpassCard from '../components/OutpassCard';

const Outpass = () => {
    return (
        <>
            <section>
                <div className="wrapper">
                    <VerticalNavbar />
                    <div className="main_content">
                        <div className="info">
                            <OutpassCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Outpass; 