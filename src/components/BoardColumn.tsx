"use client";

import { useDroppable } from "@dnd-kit/core";
import PageTaskBoard from "./PageTaskBoard";
import { getColumnColor } from "../types/colors";
import { Task } from "@/src/types/task";

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

interface BoardColumnProps {
  column: Column;
  onOpenTask: (task: Task) => void;
}

const BoardColumn = ({ column, onOpenTask }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id, // IMPORTANT: column.id is the drop target
  });

  return (
    <div ref={setNodeRef} className="w-[280px] shrink-0">
      {/* Column header */}
      <div className="flex items-center gap-3 mb-[12px]">
        <span
          className="w-[15px] h-[15px] rounded-full"
          style={{ backgroundColor: getColumnColor(column.name) }}
        />

        <span className="text-[12px] font-bold tracking-[2.4px] text-[#828FA3] uppercase">
          {column.name} ({column.tasks.length})
        </span>
      </div>

      {/* Task list */}
      <div
        
      >
        {column.tasks.map((task) => (
          <PageTaskBoard
            key={task.id}
            task={task}
            onClick={() => onOpenTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
