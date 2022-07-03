import React from 'react'
import "./Footer.css"
import {AiFillGithub} from "react-icons/ai"
import {BsLinkedin, BsTwitter} from "react-icons/bs"

function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className="ele-row socialIcons">
          <a href="https://github.com/Binary-Beasts-team" target="_blank" rel="noreferrer noopener"><AiFillGithub className='IconItem'/></a>
          <a href="#" target="_blank" rel="noreferrer noopener"><BsLinkedin className='IconItem'/></a>
          <a href="#" target="_blank" rel="noreferrer noopener"><BsTwitter className='IconItem'/></a>
        </div>
        <div class="ele-row">
          Outpass Management System ||
          Designed and Developed By: Binary Beasts
          
          <br />
          Copyright © 2022 - All rights reserved
        </div>
      </footer>
    </>
  )
}

export default Footer