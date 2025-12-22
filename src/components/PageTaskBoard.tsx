import { useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { Task } from "@/src/types/task"

interface PageTaskBoardProps{
    task: Task
    onClick: () => void
}

const PageTaskBoard = ({ task, onClick }: PageTaskBoardProps) => {
     const { colorScheme, setColorScheme } = useMantineColorScheme();
        const isDark = colorScheme === "dark";    
        
        const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted).length
        const totalSubtasks = task.subtasks.length
  return (
    <div className='p-[8px] w-fill bg-[#FFF] dark:bg-[#3E3F4E] rounded-[4px] cursor-pointer mb-[12px]' onClick={onClick}>
      <div className='text-[#000112] dark:text-[#FFF] font-bold hover:text-[#635FC7]'>{task.title}</div>
      <div className='text-[#828FA3] font-medium'>{completedSubtasks} of {totalSubtasks} subtasks</div>
    </div>
  );
}

export default PageTaskBoard;
