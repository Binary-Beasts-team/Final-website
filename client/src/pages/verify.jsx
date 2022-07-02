import React, { useEffect,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export default function Verify() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { userId, token } = queryString.parse(search);
    
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.put(
                    `/api/auth/mailoptions/mailverification/${userId}/${token}`);
                if (data) {
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    navigate("/");
                } else {
                    console.log("error... in response data");
                }
            } catch (error) {
                console.log("error in verification ", error.message);
            }
        }
        verifyUser();
    }, []);

    return (
        <>
            <div>
                <h1> user verification - team vidkarya</h1>
                <h3>There is an error in verification......</h3>
            </div>
        </>
    );
}