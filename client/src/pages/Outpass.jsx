import React from "react";
import "./../css/Outpass.css";
import VerticalNavbar from "../components/verticalNavbar";
import OutpassCard from "../components/OutpassCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Outpass = () => {
    const [outPass, setoutPass] = useState({});

    useEffect(() => {
        const GetOutpasses = async () => {
            const userData = JSON.parse(localStorage.getItem("userInfo"));
            try {
                if (userData) {
                    const id = userData._id;
                    const res = await axios.put(`/api/outpass/${id}/student`);
                    if (res) {
                        setoutPass(res.data);
                        // console.log(res.data);
                    } else {
                        console.log(res.data);
                    }
                } else {
                    console.log("Not Logged In");
                }
            } catch (error) {
                console.log(error);
            }
        };
        GetOutpasses();
    }, []);

    console.log(outPass);

    return (
        <>
            <section>
                <div className="wrapper">
                    <VerticalNavbar />
                    <div className="main_content">
                        <div class="strike font-serief line">
                            <span>Create New</span>
                        </div>
                        <div className=" grid grid-cols-3">
                            {outPass.outpass &&
                                outPass.outpass.map((pass, idx) => {
                                    return (
                                        <OutpassCard
                                            name={outPass.name}
                                            regNo={outPass.regNo}
                                            id={pass._id}
                                            status={pass.currentstatus}
                                            dol={pass.DOL}
                                            dor={pass.DOR}
                                            reason={pass.reason}
                                            destination={pass.destination}
                                        />
                                    );
                                })}
                        </div>
                        <div class="strike font-serief line">
                            <span>Pending Requests</span>
                        </div>
                        <div className=" grid grid-cols-3">
                            {outPass.pendingoutpass &&
                                outPass.pendingoutpass.map((pass, idx) => {
                                    return (
                                        <OutpassCard
                                            name={outPass.name}
                                            regNo={outPass.regNo}
                                            id={pass._id}
                                        />
                                    );
                                })}
                        </div>
                        <div class="strike font-serief line">
                            <span>Approved </span>
                        </div>
                        <div className=" grid grid-cols-3">
                            {outPass.approvedoutpass &&
                                outPass.approvedoutpass.map((pass, idx) => {
                                    return (
                                        <OutpassCard
                                            name={outPass.name}
                                            regNo={outPass.regNo}
                                            id={pass._id}
                                        />
                                    );
                                })}
                        </div>

                        <div class="strike font-serief line">
                            <span>Declined </span>
                        </div>
                        <div className=" grid grid-cols-3">
                            {outPass.declinedoutpass &&
                                outPass.declinedoutpass.map((pass, idx) => {
                                    return (
                                        <OutpassCard
                                            name={outPass.name}
                                            regNo={outPass.regNo}
                                            id={pass._id}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Outpass;
