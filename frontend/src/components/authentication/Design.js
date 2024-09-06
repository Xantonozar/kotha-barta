import React from 'react'
import fmo from '../../pages/fmo.png'
import balcony from '../../pages/Family Values - Balcony.png'   
import chat from '../../pages/Family Values - Talking.png'
import logo from '../../pages/Hands - Arrow.png'
import './Design.css'
const Design = () => {
  return (
    <div className='design'>
        <img className='pic1' src={fmo} alt='fm'/>
<img className='pic2' src={balcony} />
<img className='pic3' src={chat} />

<img className='logo' src={logo} alt='fm'/>
    </div>
  )
}

export default Design