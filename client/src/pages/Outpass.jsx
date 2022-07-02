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
                        <div class="strike font-serief line">
                            <span>Create New</span>
                        </div>
                        <div className="info">
                            <OutpassCard />
                            <OutpassCard />
                        </div>
                        <div class="strike font-serief line">
                            <span>Pending Requests</span>
                        </div>
                        <div className="info">
                            <OutpassCard />
                            <OutpassCard />
                        </div>
                        <div class="strike font-serief line">
                            <span>Approved </span>
                        </div>
                        <div className="info">
                            <OutpassCard />
                            <OutpassCard />
                            <OutpassCard />
                        </div>
                        <div class="strike font-serief line">
                            <span>Declined </span>
                        </div>
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