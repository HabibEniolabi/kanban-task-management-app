"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import { Board } from "./SidebarCommon/BoardSesction";
import { Task } from "@/src/types/task";
import BoardColumn from "./BoardColumn";

interface BoardPageProps {
  board: Board;
  onOpenTask: (task: Task) => void;
  onClick: () => void;
  onMoveTask: (taskId: string, columnId: string) => void;
}

const BoardPage = ({
  board,
  onOpenTask,
  onClick,
  onMoveTask,
}: BoardPageProps) => {
  //   );
  // }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    onMoveTask(active.id as string, over.id as string);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 👈 THIS IS THE FIX
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-nowrap gap-[12px] p-[24px] overflow-x-auto w-full no-scrollbar">
        {board.columns?.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onOpenTask={onOpenTask}
          />
        ))}

        <div className="bg-[#E4EBFA] dark:bg-[#20212c] min-w-[280px] min-h-screen rounded-[6px] mt-8 shrink-0 flex items-center justify-center">
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
