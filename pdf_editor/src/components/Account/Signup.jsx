import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

import Intro from "./Intro";

const Signup = () => {

     window.onload = function () {
          if (localStorage.getItem('userToken')) {
               localStorage.removeItem('userToken');
          }
          if (localStorage.getItem('userId')) {
               localStorage.removeItem('userId');
          }
     };


     const navigate = useNavigate();

     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [userName, setuserName] = useState("");
     const [password, setPassword] = useState("");
     const [warnDisplay, setwarnDisplay] = useState(false);
     const [button, setButton] = useState(false);


     const handleSumbit = (e) => {
          e.preventDefault();
          setButton(true);
          if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
               setButton(false);
               toast.warning("Password should be at least 8 characters long and contain at least one special character.");
          } else {
               axios.post("http://127.0.0.1:8080/auth/signup", {
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    password: password,
               }).then((res) => {
                    if (res.data?.message === true) {
                         setFirstName("")
                         setLastName("")
                         setuserName("")
                         setPassword("")
                         setwarnDisplay("")
                         setTimeout(() => {
                              toast.success("Login successful!");
                              navigate('/login');
                         }, 6000);
                         toast.success("Your are succesfully Signed Up. We are directiong you to LOGIN page !!!");
                    } else {
                         setwarnDisplay(true);
                    }
               }).catch((error) => {
                    console.log(error);
                    setButton(false)
               }).finally(() => {
                    setButton(false)
               });
          };
     };


     return (
          <div className=" h-screen">
               <ToastContainer style={{ fontSize: "12px" }} />
               <div className="bg-gray-100 flex justify-center items-center h-screen w-full px-60 md:space-x-20">

                    <Intro height={500} />

                    <div className="p-5 w-full h-fit shadow-2xl">
                         <h1 className="text-2xl font-semibold mb-4">Signup</h1>
                         <form onSubmit={handleSumbit} className="h-fit">
                              <div className="sm:flex sm:flex-col justify-between">
                                   <div className="mb-4 w-full">
                                        <label
                                             htmlFor="username"
                                             className="block text-gray-600"
                                        >
                                             First Name
                                        </label>
                                        <input
                                             required
                                             placeholder="First Name"
                                             type="text"
                                             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                             autoComplete="off"
                                             value={firstName}
                                             onChange={(e) => {
                                                  setFirstName(e.target.value);
                                             }}
                                        />
                                   </div>
                                   <div className="mb-4 w-full">
                                        <label
                                             htmlFor="username"
                                             className="block text-gray-600"
                                        >
                                             Last Name
                                        </label>
                                        <input
                                             required
                                             placeholder="Last Name"
                                             type="text"
                                             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                             autoComplete="off"
                                             value={lastName}
                                             onChange={(e) => {
                                                  setLastName(e.target.value);
                                             }}
                                        />
                                   </div>
                              </div>
                              <div className="mb-4">
                                   <label
                                        htmlFor="username"
                                        className="block text-gray-600"
                                   >
                                        Username
                                   </label>
                                   <input
                                        required
                                        placeholder="Enter a username"
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                        autoComplete="off"
                                        value={userName}
                                        onChange={(e) => {
                                             setuserName(e.target.value);
                                        }}
                                   />
                                   {warnDisplay && (<div
                                        className="text-red-600 text-[12px] italic"

                                   >
                                        User Name already used
                                   </div>)}
                              </div>
                              <div className="mb-4">
                                   <label
                                        htmlFor="password"
                                        className="block text-gray-600"
                                   >
                                        Password
                                   </label>
                                   <input
                                        required
                                        placeholder="Enter a password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => {
                                             setPassword(e.target.value);
                                        }}
                                   />
                              </div>
                              <button
                                   type="submit"
                                   disabled={button}
                                   className="bg-gray-900 hover:bg-gray-950 text-white font-semibold rounded-xl py-2 px-4 w-full"
                              >
                                   Sign Up
                              </button>
                         </form>
                         <div className="mt-6 text-blue-500 text-center">
                              <Link to="/" className="hover:underline">
                                   Already Have An Account ! Login Here
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Signup;
