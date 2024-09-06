import React from 'react'
import SignUp from '../components/authentication/SignUp'
import Login from '../components/authentication/LogIn'
import './Home.css'
import Design from '../components/authentication/Design'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useState , useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'



const Home = () => {
  const { animation , setAnimation} = ChatState()
  const [classChange, setclassChange] = useState(false)
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const history = useHistory()
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
      setDeviceHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);  


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
useEffect(() => {
  const one = document.getElementById('left')
  const two = document.getElementById('right')

if(animation && deviceWidth > deviceHeight ) {

  one.classList.add('action')
  two.classList.add('normal')
  setclassChange(true)
  console.log("kahini");   
}else { 
  console.log("running");   
if(classChange){
  console.log("shit");  
  one.classList.remove('action')
  two.classList.remove('normal')
}
  
}
})

  return (
    <>
    <div  className='container'>
      
    <div id='left' className='left one'>
    { !animation ? <SignUp/> : <Login/>}
      </div>
    
      <div id='right' className='right two'>     
<Design/>
      </div>

    </div>

  
  
    </>
  )
}

export default Home