import React, { useState } from 'react';
import Header from '../../components/components/Header';
import Loader from '../../components/components/Loader';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPoll = () => {
  //   const [value, setValue] = useState(['']);
  const [options, setOptions] = useState(['', '']);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addOptions = () => {
    setOptions((prev) => [...prev, '']);
  };
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const handleOptions = (e, i) => {
    let data = [...options];
    data[i] = e.target.value;
    setOptions(data);
  };
  const deleteHandler = (i) => {
    const deleteOptions = options.filter((option, index) => index !== i);
    setOptions(deleteOptions);
  };
  const submit = async (e) => {
    e.preventDefault();
    const formData = {
      question: question,
      options: options,
    };
    setIsLoading(true);
    try {
      await axios.post('http://localhost:4000/api/polls/create', {
        ...formData,
      });
      setIsLoading(false);
      toast.success('Poll created successfully');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
    setQuestion('');
    setOptions(['', '']);
    console.log(formData);
  };

  return (
    <div className="min-h-screen sm:overflow-hidden px-4  py-8  bg-violet-950">
      <Header
        link2={'/'}
        text2={'Logout'}
        logOut={true}
        away={true}
        link3={'/addPoll'}
        text3={'Add Poll'}
      />
      <div className=" w-[90%] sm:w-[50%] m-auto p-4 flex flex-col mt-[100px] justify-center items-center rounded-md text-center space-y-4  bg-white shadow-sm shadow-black/50">
        <p className="text-center font-bold text-3xl mb-4">Add a new poll</p>
        <form onSubmit={submit} className="grid space-y-4 w-full">
          <input
            type="text"
            className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
            placeholder="Question"
            value={question}
            onChange={handleQuestion}
          />
          {options.map((option, i) => (
            <div key={i} className="relative">
              <input
                type="text"
                className="bg-slate-300 border-none rounded-md p-3 w-full  outline-none"
                placeholder="Options"
                value={option}
                onChange={(event) => handleOptions(event, i)}
              />
              <MdCancel
                className="absolute top-2 right-1 cursor-pointer p-2 "
                onClick={deleteHandler.bind(this, i)}
                color="red"
              />
            </div>
          ))}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="space-x-2 flex items-center justify-center">
              <li
                onClick={addOptions}
                className="bg-blue-500 p-2 mb-4 rounded-md text-white list-none"
              >
                Add option
              </li>
              <button
                type="submit"
                className="bg-blue-500 p-2 mb-4 rounded-md text-white"
              >
                Create Poll
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPoll;
