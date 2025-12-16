"use client";
import Cancel from "@/src/assets/icon/cancel";
import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { Formik, Field, FormikHelpers } from "formik";

interface CreateBoardModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (name: string, column: string[]) => void;
  title: string;
  initialName?: string;
  initialColumns?: string[];
}

const CreateBoardModal = ({
  opened,
  onClose,
  onSubmit,
  title,
  initialName =  "",
  initialColumns = ["", ""]
}: CreateBoardModalProps) => {
  const [name, setName] = useState(() => initialName);
  const [columns, setColumns] = useState<string[]>(() =>
  initialColumns.length > 0 ? initialColumns : ["", ""]);

  const handleDeleteColumn = (index: number) => {
    if (columns.length > 1) {
      // Keep at least one column
      setColumns((prevColumns) =>
        prevColumns.filter((_, colIndex) => colIndex !== index)
      );
    }
  };

  const handleAddColumn = () => {
    setColumns([...columns, ""]);
  };

  const handleUpdateColumn = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty columns
    const filteredColumns = columns.filter((column) => column.trim() !== "");
    onSubmit(name, filteredColumns);
    setName("");
    setColumns(["", ""]); // Reset to default
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 4,
      }}
      size={480}
    >
      <div className="flex flex-col gap-4 bg-white p-[12px] rounded-[6px]">
        <h2 className="text-lg font-bold text-[#000112]">{title} Board</h2>

        <form
          className="flex flex-col gap-[12px]"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, columns);
            setName("");
          }}
        >
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
            {columns.map((column, index) => (
              <div key={index} className="flex gap-[10px] items-center">
                <input
                  type="text"
                  className="border border-[#828FA3]/30 w-full p-[10px] rounded-[8px] text-[12px] focus:outline-none focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7]"
                  placeholder={`Column ${index + 1}`}
                  onChange={(e) => handleUpdateColumn(index, e.target.value)}
                  value={column}
                />
                <div
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => handleDeleteColumn(index)}
                >
                  <Cancel color="#828FA3" width={20} height={20} />
                </div>
              </div>
            ))}
          </label>

          <button
            type="button"
            className="bg-[#A8A4FF] text-[#fff] p-[10px] border-none cursor-pointer font-bold rounded-[32px]"
            onClick={handleAddColumn}
          >
            + Add New Column
          </button>

          <button
            type="submit"
            className="bg-[#635FC7] text-[#fff] p-[10px] border-none cursor-pointer font-bold rounded-[32px] hover:bg-[#5245c2]"
          >
             {title === "Edit" ? "Save Changes" : "Create New Board"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
