import { Modal, useMantineColorScheme } from "@mantine/core";
import React from "react";

interface DeleteBoardModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  subTitle: string;
}

const DeleteBoardModal = ({
  opened,
  onSubmit,
  onClose,
  title,
  subTitle,
}: DeleteBoardModalProps) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <div>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
        size={480}
      >
        <div className="flex flex-col p-[12px] gap-[10px]">
          <div className="text-[#EA5555] font-bold ">Delete this {title}?</div>
          <div className="text-[#828FA3] text-[13px]">{subTitle}</div>
          <div className="flex gap-[16px]">
            <button
              type="button"
              onClick={onSubmit}
              className="rounded-[32px] cursor-pointer p-[8px] w-full border-none font-bold bg-[#EA5555] text-[#fff]"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-[32px] cursor-pointer p-[4px] w-full border-none font-bold bg-[#635FC7]/10 dark:bg-[#fff] text-[#635FC7]"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteBoardModal;
