import Ellipsis from "@/src/assets/icon/ellipsis";
import { Menu, Modal, useMantineColorScheme } from "@mantine/core";
import { Task, Subtask, Column } from "@/src/types/task";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";


interface CreateTaskBoardModalProps {
  title: string;
  columns: Column[]
  subTitle?: string;
  onClose: () => void;
  opened: boolean;
  onSubmit: () => void;
  onEdit: () => void;
  onDelete: () => void;
  task: Task;
  onSubtaskToggle: (subtaskId: string) => void;
  onStatusChange: (columnId: string) => void;
}

const CreateTaskBoardModal = ({
  title,
  subTitle,
  onClose,
  opened,
  onSubmit,
  onEdit,
  onDelete,
  task,
  columns,
  onSubtaskToggle,
  onStatusChange,
}: CreateTaskBoardModalProps) => {
  const [ selectedStatus, setSelectedStatus ] = useState(task.columnId)

  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    const newColumnId = e.target.value;
    setSelectedStatus(newColumnId);
    onStatusChange(newColumnId);
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
      size={480}
      styles={{
        content: {
          backgroundColor: isDark ? "#2b2c37" : "#fff",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col gap-[15px] bg-white dark:bg-[#2B2C37] p-[12px] rounded-[6px]">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[#000112] dark:text-[#fff] max-w-[80%]">
            {title}
          </div>
          <div>
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <button className="h-[18px] w-[18px] bg-transparent border-none cursor-pointer flex items-center justify-center">
                  <Ellipsis color="#828FA3" width={48} height={18} />
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item color="#828FA3" onClick={onEdit}>
                  Edit Task
                </Menu.Item>

                <Menu.Item color="red" onClick={onDelete}>
                  Delete Task
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
        <div className="text-[#828FA3] text-[13px] leading-[23px]">
          {subTitle}
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-[#828FA3] dark:text-[#fff]">
            Subtasks({completedSubtasks} of {totalSubtasks})
          </div>
          <div className="flex flex-col gap-[8px] mt-[8px]">
            {task.subtasks.map((subtask) => {
              return (
                <div
                  className="flex items-center
                  bg-[#F4F7FD] dark:bg-[#20212C]
                  p-[7px] rounded
                  hover:bg-[#635FC7]/10
                  dark:hover:bg-[#635FC7]/20
                  transition-colors
                  cursor-pointer gap-[12px]"
                  key={subtask.id}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={subtask.isCompleted}
                    onChange={() => onSubtaskToggle(subtask.id)}
                    className="
                    w-[16px] h-[16px]
                    accent-[#635FC7]
                    cursor-pointer
                  "
                  />
                <span className={`text-[13px] dark:text-[#fff] text-[#000112] bg-[#828FA3]/24 p-[4px] rounded-[4px] ${subtask.isCompleted ? 'text-[#828FA3] line-through' : 'text-[#000112] dark:text-white'}`}>
                    {subtask.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <div className="text-[#828FA3] dark:text-[#fff] text-[13px] leading-[23px] font-bold">
            Current Status
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="
                w-full
                px-4 py-2 pr-8
                border border-[#828FA3]/25 rounded
                bg-white dark:bg-[#2B2C37]
                text-sm font-medium
                text-[#000112] dark:text-white
                appearance-none
                cursor-pointer
                focus:outline-none focus:ring-1 focus:ring-[#635FC7]
              "
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTaskBoardModal;
