import React from 'react';
import './globals.css';

const page = () => {
  const onAddTask = () => {
    console.log("Add Task Clicked");
  }

  return (
    <div className='flex items-center justify-center h-screen bg-[#E4EBFA]'>
      <h3></h3>
      <button 
          className='bg-[#635FC7] text-white font-bold cursor-pointer rounded-full h-[48px] px-6 text-sm hover:bg-[#A8A4FF] transition-colors duration-200'
          // onClick={onAddTask}
        >
        + Add New Column
        </button>
    </div>
  );
}

export default page;