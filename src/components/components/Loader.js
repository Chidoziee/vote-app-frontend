import React from 'react'
import LoaderImg from '../../assets/gif.gif'

const Loader = () => {
  return (
    <div className=' flex items-center justify-center bg-[transparent]'>
      <img src={LoaderImg} alt="loader" className='w-10 h-auto' />
    </div>
  );
}

export default Loader