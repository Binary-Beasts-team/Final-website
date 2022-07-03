import React from 'react'
import errorImg from "../css/images/errorpage.webp";
import "../css/error.css"

function error() {
  return (
    <div className="error">
        <div className="errorPg">
            <img src={errorImg} alt="" className="errorImg" />
        </div>
    </div>
  )
}

export default error