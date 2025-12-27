"use client";

import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board } from "./SidebarCommon/BoardSesction";
import { Task } from "@/src/types/task";
import BoardColumn from "./BoardColumn";

interface BoardPageProps {
  board: Board;
  onOpenTask: (task: Task) => void;
  onClick: () => void;
}

const BoardPage = ({ board, onOpenTask, onClick }: BoardPageProps) => {
  const [task, setTask] = useState<Task[]>(()=>
  board.columns?.flatMap(col => col.tasks) ?? []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setTask((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? { ...t, columnId: over.id as string, status: over.id as string }
          : t
      )
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-nowrap gap-[12px] p-[24px] overflow-x-auto w-full no-scrollbar">
        {board.columns?.map((column) => (
          <BoardColumn
            key={column.id}
            column={{
              ...column,
              tasks: task.filter((t) => t.columnId === column.id),
            }}
            onOpenTask={onOpenTask}
          />
        ))}

        <div className="bg-[#E4EBFA] dark:bg-[#20212c] min-w-[280px]  rounded-[6px] mt-8 shrink-0 flex items-center justify-center">
          <div
            className="cursor-pointer text-[#828FA3] font-bold text-[24px] hover:text-[#635FC7]"
            onClick={onClick}
          >
            + New Column
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default BoardPage;
