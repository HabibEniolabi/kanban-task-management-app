"use client";
import Cancel from "@/src/assets/icon/cancel";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { Formik, Field } from "formik";

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
  initialName = "",
  initialColumns = ["", ""],
}: CreateBoardModalProps) => {
  const [columns, setColumns] = useState<string[]>(() =>
    initialColumns.length > 0 ? initialColumns : ["", ""]
  );

  const handleDeleteColumn = (index: number) => {
    if (columns.length > 1) {
      setColumns(columns.filter((_, i) => i !== index));
    }
  };

  const handleAddColumn = () => {
    setColumns([...columns, ""]);
  };

  const handleUpdateColumn = (index: number, value: string) => {
    const updated = [...columns];
    updated[index] = value;
    setColumns(updated);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
      size={480}
    >
      <div className="flex flex-col gap-4 bg-white p-[12px] rounded-[6px]">
        <h2 className="text-lg font-bold text-[#000112]">{title} Board</h2>

        <Formik
          enableReinitialize
          initialValues={{ name: initialName }}
          onSubmit={(values) => {
            const filteredColumns = columns
              .map((c) => c.trim())
              .filter(Boolean);

            onSubmit(values.name.trim(), filteredColumns);
            onClose();
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
              <label className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#828FA3]">Name</span>
                <Field
                  name="name"
                  type="text"
                  placeholder="e.g. Project Alpha"
                  className="border border-[#828FA3] rounded-[6px] p-[12px] text-[#000112]"
                />
              </label>

              <label className="flex flex-col gap-[10px] w-full">
                <span className="font-medium text-[#828FA3]">Columns</span>

                {columns.map((column, index) => (
                  <div key={index} className="flex gap-[10px] items-center">
                    <input
                      type="text"
                      value={column}
                      placeholder={`Column ${index + 1}`}
                      onChange={(e) =>
                        handleUpdateColumn(index, e.target.value)
                      }
                      className="border border-[#828FA3]/30 w-full p-[10px] rounded-[8px] text-[12px]"
                    />
                    <div
                      onClick={() => handleDeleteColumn(index)}
                      className="cursor-pointer"
                    >
                      <Cancel color="#828FA3" width={15} height={15} />
                    </div>
                  </div>
                ))}
              </label>

              <button
                type="button"
                onClick={handleAddColumn}
                className="bg-[#A8A4FF] text-[#fff] border-none cursor-pointer p-[10px] font-bold rounded-[32px]"
              >
                + Add New Column
              </button>

              <button
                type="submit"
                className="bg-[#635FC7] text-[#fff] border-none cursor-pointer p-[10px] font-bold rounded-[32px]"
              >
                {title === "Edit" ? "Save Changes" : "Create New Board"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
