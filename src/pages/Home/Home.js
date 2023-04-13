import React from 'react';

import Header from '../../components/components/Header'
import Hero from '../../components/components/Hero';

const Home = () => {
  return (
    <div className="min-h-screen sm:overflow-hidden px-4  bg-violet-950">
      <Header
        text1="Register"
        text2="Login"
        link1={'/register'}
        link2={'/login'}
      />
      <Hero />
    </div>
  );
};

export default Home;
