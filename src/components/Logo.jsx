import React from 'react'
import logimg from "../assets/images/logo.png";

function Logo({width = "100px",height="10px"}) {
  return (
    <div>
      <img
        src={`${logimg}`}
        alt="Logo"
        width={width}
        className='object-contain'
        height={height}
      />
  </div>
  )
}

export default Logo
