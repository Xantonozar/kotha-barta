import React from "react";
import "./SignUp.css";
import { background } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import  axios from "axios";
const SignUp = () => {
  const [name, setname] = useState();
  const history = useHistory();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [show, setshow] = useState(false);
  const [pics, setpics] = useState();
  const [loading, setloading] = useState(false);
  const { animation, setAnimation } = ChatState();
 const toast = useToast();
  const changeAnimation = () => {
    setAnimation(true);
  };

  {
    console.log(animation);

    console.log(animation);
  }
  const postDetails =async (pic) => {
    setloading(true);
    if (pic === undefined) {
      setloading(false);
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
       
        
      const data = new FormData();
  
    
    
      data.append("file", pic);
      data.append("upload_preset", "barta1");
      data.append("cloud_name", "chirkut");
      fetch("https://api.cloudinary.com/v1_1/chirkut/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpics(data.url.toString());
     
          setloading(false);
        })
        .catch((err) => {
          console.error(err);
          setloading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
  })};
  }
  const handleSubmit = async (e) => {

    
    setloading(true);
    if (!name || !email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
      })
      setloading(false);
      return;
  }
  // if (password !== confirmpassword) {
  //   toast({
  //     title: 'Password Do Not Match',
  //     status: 'warning',
  //     duration: 5000,
  //   })
  //   setloading(false);
  //   return;
  // }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/user",
      {
        name,
        email,
        password,
        pic:pics
      },
      config
    );
    toast({
      title: 'Registration Successful',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    localStorage.setItem("userInfo", JSON.stringify(data));
   
  
  
    
    setloading(false);
    history.push("/chats");
  } catch (error) {
    toast({
      title: 'Error Occured!',
      description: error.response.data.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    setloading(false);
    return;
  }
  
  
  
  };
  return (
    <>
      <div>
        <h1>Sign Up to Chat</h1>
        
      </div>
      <div data-theme="light" className="card w-96 bg-inherit  gap-10">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#132a13"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input  onChange={(e) => {setname(e.target.value) }} type="text" className="grow" placeholder="Username" />
        </label>
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
          <input   onChange={(e) => setemail(e.target.value)} type="email" className="grow" placeholder="Email" />
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
          <input  onChange={(e) => setpassword(e.target.value)} type="password" className="grow" placeholder="********" />
        </label>
     <input
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
          type="file"
          className="file-input file-input-bordered file-input-success  file-upload"
        />
       
        <button onClick={handleSubmit} className="btn  btn-success">
          Sign Up
        </button>
      </div>
      <div className="footer">
        <div onClick={changeAnimation} className="">
          Already have an account ?
        </div>
      </div>
    </>
  );
};

export default SignUp;
