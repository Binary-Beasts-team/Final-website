import React, { useEffect,useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

export default function Verify() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const { userId, token } = queryString.parse(search);
    console.log("hello");

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.put(
                    `http://localhost:3000/api/auth/mailoptions/mailverification/${userId}/${token}`,{
                        userId,token
                    });
                console.log(data);
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