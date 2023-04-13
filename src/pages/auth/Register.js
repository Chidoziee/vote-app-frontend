import React, { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
// eslint-disable-next-line
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// eslint-disable-next-line

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_USERNAME } from '../../Redux/features/authSlice';
import Loader from '../../components/components/Loader';

export const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { username, password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const register = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }
    const userData = {
      username: username.toLocaleLowerCase(),
      password: password,
    };

    try {
      setIsLoading(true);
      // const data =  await registerUser(userData);
      const { data } = await axios.post(
        'http://localhost:4000/api/users/register',
        userData
      );
      toast.success('User registered successfully');

      dispatch(SET_LOGIN(true));
      dispatch(SET_USERNAME(data.username));
      navigate('/polls');
      setIsLoading(false);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center h-screen bg-zinc-200">
        <div className=" w-[70%] sm:w-[30%] m-auto p-4 flex flex-col justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
          <FiUserPlus color="orange" size={40} />
          <p className="text-center font-bold text-3xl">Register</p>
          <form onSubmit={register} className="grid space-y-4 w-full">
            <input
              type="text"
              className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
              placeholder="Username"
              name="username"
              required
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={handleInputChange}
              y
            />
            <input
              type="password"
              className="bg-slate-300 border-none rounded-md p-3 w-full   outline-none"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={handleInputChange}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 p-2 rounded-md text-white"
              >
                Sign up
              </button>
            )}
          </form>
          <div className="text-center mb-4 flex space-x-1 items-center">
            <p className="text-xs">Already have an account? </p>{' '}
            <p className="text-blue-500">
              <Link to={'/Login'}> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
