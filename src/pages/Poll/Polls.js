import React, { useEffect, useState } from 'react';
import Header from '../../components/components/Header';
import axios from 'axios';

import PollCard from '../../components/PollCard';
import Loader from '../../components/components/Loader';
import { toast } from 'react-toastify';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllPolls = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:4000/api/polls')
      .then(({ data }) => {
        return setPolls(data);
      })
      .then(() => {
        return setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPolls();
  }, []);
  const deleteHandler = async (id) => {
    console.log(id, 'dfsfs');
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/polls/${id}`
      );
      setIsLoading(false);
      toast.success(`${data.question} has been deleted`);
      getAllPolls();
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen sm:overflow-hidden px-4  py-8  bg-violet-950">
      <Header
        link2={'/'}
        text2={'Log out'}
        logOut={true}
        away={true}
        link3={'/addPoll'}
        text3={'Add Poll'}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h3 className="text-white mt-4 text-2xl font-bold text-center">
              Click on each poll to vote!!!
            </h3>
          </div>
          <div className="mt-[50px]">
            {polls.map((poll) => (
              <>
                <PollCard
                  key={poll._id}
                  question={poll.question}
                  options={poll.options}
                  votes={poll.voted}
                  id={poll._id}
                  deleteHandler={deleteHandler}
                />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Polls;
