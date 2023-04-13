import React from 'react';
import VoteImg from '../../assets/vote.jpg';
const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto flex-col items-center justify-center md:flex-row flex h-full py-14 md:space-x-8 space-y-8 text-white">
      <div className="right basis mt-8 basis-[100%] sm:basis-[45%]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          Join our E-voting community where free and fair elections can be
          assured
        </h1>
        <p className="text-lg text-slate-300">
          Our system is being used all over the world by brands for voting, we
          have a database that matches every user with their id cards to avoid
          multiple votes per user.
        </p>
        <p className="text-lg text-slate-300">
          Let your votes count, we are tested and trusted!!!
        </p>
      </div>
      <div className=" w-full h-[500px] rounded-sm overflow-hidden  shadow-lg shadow-black basis-[100%] md:basis-[55%]">
        <img src={VoteImg} alt="vote-img" className="h-full w-full" />
      </div>
    </div>
  );
};

export default Hero;
