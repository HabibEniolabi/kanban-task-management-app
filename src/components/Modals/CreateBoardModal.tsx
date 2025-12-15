"use client";
import Cancel from "@/src/assets/icon/cancel";
import { Modal } from "@mantine/core";
import { useState } from "react";

interface CreateBoardModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const CreateBoardModal = ({ opened, onClose, onSubmit }: CreateBoardModalProps) => {
   const [name, setName] = useState("");
   const [columns, setColumns] = useState<string[]>(["", ""]);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size={480}
    >
      <div className="flex flex-col gap-4 bg-white p-[12px] rounded-[6px]">
        <h2 className="text-lg font-bold text-[#000112]">
          Add New Board
        </h2>

        <form className="flex flex-col gap-[12px]" 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
            setName("");
          }}>
          <label className="flex flex-col gap-[8px]">
            <span className="font-medium text-[#828FA3]">Name</span>
            <input
              type="text"
              className="border border-[#828FA3] rounded-[6px] p-[12px] text-[#000112]"
              placeholder="e.g. Project Alpha"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>

          <label className="flex flex-col gap-[10px] w-full">
            <span className="font-medium text-[#828FA3]">Columns</span>
            <div className="flex gap-[12px] items-center">
              <input
                type="text"
                className="border border-[#828FA3] w-full p-[10px] rounded-[6px] p-2"
                placeholder="To Do"
                onChange={(e) => setName(e.target.value)}
                value={columns[0]}
                />
               <div className="cursor-pointer">
              <Cancel color="#828FA3" width={15} height={15} />
              </div>   
            </div>
            <div className="flex items-center gap-[12px]">
              <input
                type="text"
                className="border border-[#828FA3] w-full p-[10px] rounded-[6px] p-2"
                placeholder="In Progress"
                onChange={(e) => setName(e.target.value)}
                value={columns[1]}
              />
              <div className="cursor-pointer">
              <Cancel color="#828FA3" width={15} height={15} />
              </div>
            </div>
          </label>

          <button
            type="button"
            className="bg-[#A8A4FF] text-[#fff] p-[10px] border-none cursor-pointer font-bold rounded-[32px]"
          >
            + Add New Column
          </button>

          <button
            type="submit"
            className="bg-[#635FC7] text-[#fff] p-[10px] border-none cursor-pointer font-bold rounded-[32px] hover:bg-[#5245c2]"
          >
            Create New Board
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
