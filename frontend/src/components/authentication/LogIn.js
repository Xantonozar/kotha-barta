import React from "react";

import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LogIn.css";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import eyes from "./eyes.png";
import { useState } from "react";
const LogIn = () => {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { animation, setAnimation } = ChatState();
  const slideLeft = () => {};
  const changeAnimation = () => {
    setAnimation(false);
  };
  const handleSubmit = async () => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setloading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(localStorage.getItem("userInfo"));
      
      setTimeout(() => {
        history.push("/chats");
      }, 1000);
      setloading(false);
      
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
      setloading(false);
      return;
    }

}

  return (
    <>
      <div className="login-box">
        <div className="head-log">
          <h1>Log In to Engage</h1>
        </div>
        <div data-theme="light" className="card w-96 bg-inherit  gap-10">
          <label className="input  input-success flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#132a13"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow"     
        value={email}
        placceholder="Enter Your Name"
        onChange={(e) => setemail(e.target.value)} />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#132a13"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type={show?"text":"password"} className="grow"  onChange={(e) => setpassword(e.target.value)} />
          <img  onClick={()=>{setshow(!show)}} src={eyes} alt="eye" className="w-5 h-5 ml-2 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </label>

          <button onClick={handleSubmit} className="btn   btn-success">Log In</button>
        </div>
        <div onClick={changeAnimation} className="footer">
          <p>Don't have an account? </p>
        </div>
      </div>
    </>
  );
};

export default LogIn;
