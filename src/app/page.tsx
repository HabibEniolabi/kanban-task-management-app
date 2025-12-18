'use client'
import React from 'react';
import "./globals.css";
import { useMantineColorScheme } from '@mantine/core';

const Page = () => {
  const onAddTask = () => {
    console.log("Add Task Clicked");
  }
  
  const { colorScheme, setColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

  return (
    <div className='flex flex-col items-center justify-center gap-[6px] h-screen bg-[#E4EBFA] dark:bg-[#20212C]'>
      <div className='text-[#828FA3] font-bold'>This board is empty. Create a new column to get started</div>
      <button 
        className='bg-[#635FC7] text-[#FFFFFF] font-bold border-none cursor-pointer rounded-full text-sm p-[12px] hover:bg-[#A8A4FF] disabled:opacity-50 disabled:cursor-not-allowed'
        // onClick={onAddTask}
      >
        + Add New Column
      </button>
    </div>
  );
}

export default Page;