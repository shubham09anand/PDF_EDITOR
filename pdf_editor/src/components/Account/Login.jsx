import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setLoginData } from "../../Features/Counter/LoginSlice";
import { NavLink, useNavigate } from "react-router-dom";
import API from '../../Api/Api';
import Intro from "./Intro";

const Login = () => {

     window.onload = function () {
          if (localStorage.getItem('userToken')) {
               localStorage.removeItem('userToken');
          }
          if (localStorage.getItem('userId')) {
               localStorage.removeItem('userId');
          }
     };

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [userName, setUserName] = useState('');
     const [userPassword, setUserPassword] = useState('');
     const [userLoginDetails, setUserLoginDetails] = useState(null);

     // login function
     const handleLogin = async (e) => {
          e.preventDefault();
          try {
               const response = await API.post("/login", { userName, password: userPassword });
               setUserLoginDetails(response.data);
          } catch (error) {
               toast.warning("Something Went Wrong");
          }
     };

     useEffect(() => {
          if (userLoginDetails === null) {
               return;
          }
          if (userLoginDetails && userLoginDetails.success === true && userLoginDetails.token !== null) {
               dispatch(setLoginData({ token: userLoginDetails.token, userId: userLoginDetails.userData._id }));

               localStorage.setItem('userId', userLoginDetails.userData._id);
               localStorage.setItem('userToken', userLoginDetails.token);
               navigate('/home');

          } else {
               toast.warn("Something Went Wrong. Please Try Again Later");
          }
     }, [userLoginDetails]);

     // console.log(userLoginDetails)


     return (
          <form className="w-full bg-slate-100 h-screen" onSubmit={handleLogin} >
               <ToastContainer />
               <div className="h-full w-full mx-auto dark:bg-gray-900">
                    <div className="mx-auto">
                         <div className="flex justify-center place-content-center items-center h-screen md:p-0 md:px-6">
                              <div className="w-full flex mx-auto place-content-center items-center md:px-10 lg:px-60 md:gap-x-20">
                                   <Intro />
                                   <div className={`w-full mx-auto shadow-2xl h-full place-content-center items-center flex`}>
                                        <div className={`w-full h-full bg-white sm:p-5 rounded-lg`}>
                                             <h3 className="py-2 text-3xl font-semibold text-center text-gray-800 dark:text-white">
                                                  Sign In
                                             </h3>
                                             <div className="px-8 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                                                  <div className="mb-4 md:flex md:justify-between"></div>
                                                  <div className="mb-4">
                                                       <label
                                                            className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                            htmlFor="User Name"
                                                       >
                                                            User Name
                                                       </label>
                                                       <input
                                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                            id="userName"
                                                            type="userName"
                                                            name="userName"
                                                            placeholder="userName"
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                            required
                                                       />
                                                  </div>
                                                  <div className="mb-4 md:flex md:justify-between">
                                                       <div className="mb-4 md:mr-2 md:mb-0 w-full">
                                                            <label
                                                                 className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                                 htmlFor="password"
                                                            >
                                                                 Password
                                                            </label>
                                                            <input
                                                                 className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                                 id="password"
                                                                 type="password"
                                                                 name="password"
                                                                 placeholder="******************"
                                                                 value={userPassword}
                                                                 onChange={(e) => setUserPassword(e.target.value)}
                                                                 required
                                                            />
                                                       </div>
                                                  </div>
                                                  <div className="mb-6 text-center bg-gray-800 hover:bg-gray-900 rounded-2xl">
                                                       <button
                                                            className="w-full px-4 py-2 font-bold text-white rounded-full"
                                                            type=""
                                                       >
                                                            Login Account
                                                       </button>
                                                  </div>
                                                  <hr className="mb-6 border-t" />
                                                  <div className="text-center">
                                                       <div
                                                            className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"

                                                       >
                                                            Forgot Password?
                                                       </div>
                                                  </div>
                                                  <div className="text-center">
                                                       <div
                                                            className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                                       >
                                                            <NavLink to='/signup' style={{ textDecoration: "none" }}> Already have an account? Signup!</NavLink>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </form>
     );
};

export default Login;