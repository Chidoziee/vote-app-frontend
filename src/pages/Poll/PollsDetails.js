import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/components/Header';
import Loader from '../../components/components/Loader';

const PollsDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPoll = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/polls/${id}`
        );
        setIsLoading(false);
        setPoll(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPoll();
  }, [id]);
const vote = async (id) => {
  setIsLoading(true);
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/polls/vote/${id}`
    );
    setIsLoading(false);
    setPoll(data);
  } catch (error) {
    console.log(error.message);
  }
};


  const { question, voted, _id, options } = poll;
  const [selectedOption, setSelectedOption] = useState('')
console.log(selectedOption);
  return (
    <div className="min-h-screen sm:overflow-hidden px-4  py-8  bg-violet-950">
      <Header
        vote={true}
        link2={'/'}
        text2={'Logout'}
        logOut={true}
        away={true}
      />
      <div className="mt-[50px] bg-white w-[90%] sm:w-[50%] shadow-md mx-auto  py-4 shadow-black/50 rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className="font-bold sm:text-3xl text-xl text-black text-center mb-8">
              {question}
            </p>

            {
              <>
                <div className="flex items-center justify-between  w-[90%] mx-auto">
                  {options?.map((option) => {
                    return (
                      <button
                        onClick={() => setSelectedOption(option.option)}
                        key={option._id}
                        className="bg-violet-950 p-2 py-1  cursor-pointer text-white rounded-sm "
                      >
                        {option.option}
                      </button>
                    );
                  })}
                </div>
                <div className='text-center mt-2'>
                <button onClick={() => vote(id)} className="bg-black p-2 py-1   cursor-pointer text-white rounded-sm ">
                  Submit vote
                </button>

                </div>
              </>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default PollsDetails;
