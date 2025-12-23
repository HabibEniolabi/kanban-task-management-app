import Cancel from "@/src/assets/icon/cancel";
import Select from "@/src/assets/icon/select";
import { Modal, useMantineColorScheme } from "@mantine/core";
import { Field, Form, Formik } from "formik";
import { desc } from "framer-motion/client";
import React, { useState } from "react";

interface SubtaskInput {
  title: string;
}

interface CreateAddEditBoardModalProps {
  title: string;
  columns: { id: string; name: string }[];
  onSubmit: (
    title: string,
    description: string,
    columnId: string,
    subtasks: SubtaskInput[],
  ) => void;
  onClose: () => void;
  opened: boolean;
}

const CreateAddEditBoardModal = ({
  title,
  onSubmit,
  onClose,
  opened,
  columns,
}: CreateAddEditBoardModalProps) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [subtasks, setSubtasks] = useState<SubtaskInput[]>([
    { title: "" },
    { title: "" },
  ]);

  const [columnId, setColumnId] = useState(columns[0]?.id ?? "");

  const handleDeleteColumn = (index: number) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddColumn = () => {
    setSubtasks((prev) => [...prev, { title: "" }]);
  };

  const handleUpdateColumn = (index: number, value: string) =>
    setSubtasks((prev) =>
      prev.map((s, i) => (i === index ? { title: value } : s))
    );

  const textColor = isDark ? "text-white" : "text-[#000112]";

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
      <div className="flex flex-col gap-[12px] bg-white dark:bg-[#2B2C37] p-[12px] rounded-[6px]">
        <h2
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-[#000112]"
          }`}
        >
          {title} Task
        </h2>
        <Formik
          enableReinitialize
          initialValues={{ title: "", description: "" }}
          onSubmit={(values) => {
            onSubmit(
              values.title.trim(),
              values.description.trim(),
              columnId,
              subtasks.filter((s) => s.title.trim() !== "")
            );
            onClose();
          }}
        >
          {() => (
            <Form className="flex flex-col gap-[10px]">
              <label className="flex flex-col gap-[8px]">
                <span
                  className={`${textColor} font-medium text-[12px] font-bold text-[#828FA3]`}
                >
                  Title
                </span>
                <Field
                  name="name"
                  type="text"
                  placeholder="e.g. Take a coffee break"
                  className="border border-[#828FA3] rounded-[6px] p-[12px] text-[#000112] dark:text-[#fff]]"
                />
              </label>

              <label className="flex flex-col gap-[8px]">
                <span className={`font-medium text-[12px] ${textColor}`}>
                  Description
                </span>
                <Field
                  as="textarea"
                  name="description"
                  type="text"
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                  className="border border-[#828FA3] rounded-[6px] p-[12px] text-[#000112] dark:text-[#fff] resize-none h-[70px] align-top overflow-y-auto"
                  rows={4}
                />
              </label>

              <label className="flex flex-col gap-[10px] w-full">
                <span
                  className={`${textColor} font-medium text-[12px] font-bold text-[#828FA3]`}
                >
                  Subtasks
                </span>
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex gap-[10px] items-center">
                    <input
                      type="text"
                      value={subtask.title}
                      placeholder={`Subtask ${index + 1}`}
                      onChange={(e) =>
                        handleUpdateColumn(index, e.target.value)
                      }
                      className="border border-[#828FA3]/30 w-full p-[10px] rounded-[8px] text-[12px] dark:text-[#fff]"
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
                className="bg-[#A8A4FF] text-[#fff] dark:bg-[#fff] dark:text-[#A8A4FF] border-none cursor-pointer p-[10px] font-bold rounded-[32px]"
              >
                + Add New Subtask
              </button>

              <label className="w-full">
                <span
                  className="
    font-bold text-[12px] 
    text-[#828FA3] 
    dark:text-[#fff]
    block mb-[8px]
    tracking-[0.24px]
  "
                >
                  Status
                </span>
                <div className="relative">
                  <select
                    className="
      w-full 
      px-0 py-[8px] pr-[24px]
      border-0 border-solid border-[#828FA3]/30 
      bg-transparent
      text-[13px] font-medium
      text-[#000112] dark:text-white
      appearance-none
      cursor-pointer
      focus:outline-none focus:border-b-2 focus:border-[#635FC7]
    "
                  >
                    {columns.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="
      absolute 
      right-0
      top-1/2 
      transform -translate-y-1/2 
      pointer-events-none
      w-[10px] h-[7px]
      flex items-center justify-center
    "
                  >
                    <Select color="#828FA3" width={11} height={7} />
                  </div>
                </div>
              </label>

              <button
                type="submit"
                className="bg-[#635FC7] text-[#fff] border-none cursor-pointer p-[10px] font-bold rounded-[32px]"
              >
                {title === "Edit" ? "Save Changes" : "Create Task"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CreateAddEditBoardModal;
