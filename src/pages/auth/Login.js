import React, { useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { initialState } from './Register';
import axios from 'axios';
import {
  SET_ISADMIN,
  SET_LOGIN,
  SET_USERNAME,
} from '../../Redux/features/authSlice';
import Loader from '../../components/components/Loader';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { username, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    const userData = {
      username: username.toLocaleLowerCase(),
      password: password,
    };

    try {
      setIsLoading(true);
      // const data =  await registerUser(userData);
      const { data } = await axios.post(
        'http://localhost:4000/api/users/login',
        userData
      );
      toast.success('User logged in successfully');
      console.log(data);
      dispatch(SET_LOGIN(true));
      dispatch(SET_USERNAME(data.username));
      dispatch(SET_ISADMIN(data.isAdmin));
      navigate('/polls');
      setIsLoading(false);
      setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen bg-zinc-200 ">
        <div className=" w-[70%] sm:w-[30%] m-auto p-4 flex flex-col justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
          <CiLogin color="orange" size={40} />
          <p className="text-center font-bold text-3xl">Login</p>
          <form onSubmit={loginUser} className="grid space-y-4 w-full">
            <input
              type="text"
              className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 p-2 mb-4 rounded-md text-white"
              >
                Login
              </button>
            )}
          </form>
          <div className="text-center mb-4 flex space-x-1 items-center">
            <p className="text-xs">Don't have an account? </p>

            <p className="text-blue-500">
              <Link to={'/Register'}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
