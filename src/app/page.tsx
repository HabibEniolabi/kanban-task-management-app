import React from 'react';
import "./globals.css";

const page = () => {
  const onAddTask = () => {
    console.log("Add Task Clicked");
  }

  return (
    <div className='flex flex-col items-center justify-center gap-[6px] h-screen bg-[#E4EBFA]'>
      <div className='text-[#828FA3]'>This board is empty. Create a new column to get started</div>
      <button 
        className='bg-[#635FC7] text-[#FFFFFF] font-bold border-none cursor-pointer rounded-full text-sm p-[12px] hover:bg-[#A8A4FF] disabled:opacity-50 disabled:cursor-not-allowed'
        // onClick={onAddTask}
      >
        + Add New Column
      </button>
    </div>
  );
}

export default page;