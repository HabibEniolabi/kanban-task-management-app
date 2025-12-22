"use client";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BoardIcon from "../assets/icon/board";
import { Board } from "../components/SidebarCommon/BoardSesction";
import CreateBoardModal from "../components/Modals/CreateBoardModal";
import DeleteBoardModal from "../components/Modals/DeleteBoardModal";
import Eye from "../assets/icon/eye";
import { useMantineColorScheme } from "@mantine/core";
import CreateAddEditBoardModal from "../components/Modals/CreateAddEditBoardModal";
import { ApiBoard } from "@/src/types/api";
import BoardPage from "../components/BoardPage";
import { Task } from "../types/task";
import CreateTaskBoardModal from "../components/Modals/CreateTaskBoardModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useMantineColorScheme();

  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const [currentBoardId, setCurrentBoardId] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [createBoardModalOpen, setCreateBoardModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [addEditModalOpen, setAddEditModalOpen] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpenTaskModal, setISOpenTaskModal] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [modalBoardData, setModalBoardData] = useState<Board | null>(null);

  // Load boards from public/data.json on mount
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`Failed to load boards: ${response.statusText}`);
        }

        const json = await response.json();
        const jsonBoards = (json?.boards ?? []) as ApiBoard[];

        const mappedBoards: Board[] = jsonBoards.map((board, index) => ({
          id: String(index + 1),
          name: board.name,
          icon: <BoardIcon color="#828FA3" />,
          columns: board.columns.map((column, colIndex) => ({
            id: `col-${index}-${colIndex}`,
            name: column.name,
            tasks: column.tasks.map((task, taskIndex) => ({
              id: `task-${index}-${colIndex}-${taskIndex}`,
              title: task.title,
              description: task.description,
              status: task.status,
              boardId: `board-${index}`,
              columnId: `col-${index}-${colIndex}`,
              subtasks: task.subtasks.map((subtask, subIndex) => ({
                id: `subtask-${index}-${colIndex}-${taskIndex}-${subIndex}`,
                title: subtask.title,
                isCompleted: subtask.isCompleted,
              })),
            })),
          })),
        }));

        setAllBoards(mappedBoards);
        if (mappedBoards.length > 0) {
          setCurrentBoardId(mappedBoards[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadBoards();
  }, []);

  //Mantine color scheme effect
  useEffect(() => {
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorScheme]);

  const handleSelectBoard = useCallback((boardId: string) => {
    setCurrentBoardId(boardId);
  }, []);

  const handleHideSidebar = useCallback(() => {
    setIsSidebarVisible(false);
  }, []);

  const handleCreateBoard = useCallback(
    (name: string, columns: string[] = []) => {
      const newBoardId = (allBoards.length + 1).toString();
      const newBoard: Board = {
        id: newBoardId,
        name,
        icon: <BoardIcon color="#828FA3" />,
        columns: columns.map((colName, index) => ({
          id: `col-${Date.now()}-${index}`,
          name: colName,
          tasks: [],
        })),
      };
      setAllBoards([...allBoards, newBoard]);
      setCurrentBoardId(newBoardId);
      setCreateBoardModalOpen(false);
    },
    [allBoards]
  );

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarVisible(true);
  }, []);

  const handleAddTask = useCallback(() => {
    setModalMode("create");
    setModalBoardData(null);
    setAddEditModalOpen(true);
  }, []);

  const openCreateBoardModal = useCallback(() => {
    setModalMode("create");
    setModalBoardData(null);
    setCreateBoardModalOpen(true);
  }, []);

  const openEditBoardModal = useCallback(() => {
    const board = allBoards.find((b) => b.id === currentBoardId);
    if (board) {
      setModalMode("edit");
      setModalBoardData(board);
      setCreateBoardModalOpen(true);
    }
  }, [allBoards, currentBoardId]);

  const handleEditBoardSubmit = useCallback(
    (name: string, columns: string[] = []) => {
      setAllBoards((boards) =>
        boards.map((b) =>
          b.id === currentBoardId
            ? {
                ...b,
                name,
                columns: columns.map((colName, index) => ({
                  id: `col-${Date.now()}-${index}`,
                  name: colName,
                  tasks: [],
                })),
              }
            : b
        )
      );
      setCreateBoardModalOpen(false);
    },
    [currentBoardId]
  );

  const openDeleteBoardModal = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteBoard = useCallback(() => {
    setAllBoards((boards) => {
      const filtered = boards.filter((b) => b.id !== currentBoardId);

      if (filtered.length > 0) {
        setCurrentBoardId(filtered[0].id);
      } else {
        setCurrentBoardId("");
      }

      return filtered;
    });

    setDeleteModalOpen(false);
  }, [currentBoardId]);

  const handleCreateTask = useCallback(
    (name: string, columns: string[] = []) => {
      // Implement task creation logic here
      setAddEditModalOpen(false);
    },
    []
  );

  const currentBoard = allBoards.find((b) => b.id === currentBoardId);

  const handleOpenTask = useCallback((task: Task) => {
    setISOpenTaskModal(true);
    setSelectedTask(task);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full">
        <Header
          currentBoard={allBoards.find((b) => b.id === currentBoardId)}
          onAddTask={handleAddTask}
          onEditBoard={openEditBoardModal}
          onDeleteBoard={openDeleteBoardModal}
        />
      </div>
      <div className="flex flex-1">
        {isSidebarVisible ? (
          <Sidebar
            boards={allBoards}
            currentBoardId={currentBoardId}
            onSelectBoard={handleSelectBoard}
            onHideSidebar={handleHideSidebar}
            onCreateBoard={openCreateBoardModal}
          />
        ) : (
          <div
            className="fixed left-[0px] bottom-[20px] p-[12px] flex items-center justify-center bg-[#635FC7] hover:bg-[#A8A4FF] cursor-pointer rounded-r-[100px] shadow-lg z-50"
            onClick={handleOpenSidebar}
          >
            <Eye color="#fff" width={16} height={16} />
          </div>
        )}
        <main className={`w-full flex-1 overflow-x-auto`}>
          {currentBoard && (
            <BoardPage board={currentBoard} onOpenTask={handleOpenTask} />
          )}
        </main>
      </div>
      <CreateBoardModal
        key={`${modalMode}-${currentBoardId}`}
        opened={createBoardModalOpen}
        title={modalMode === "edit" ? "Edit" : "Add New"}
        initialName={modalBoardData?.name || ""}
        initialColumns={modalBoardData?.columns?.map((c) => c.name) || ["", ""]}
        onSubmit={
          modalMode === "edit" ? handleEditBoardSubmit : handleCreateBoard
        }
        onClose={() => setCreateBoardModalOpen(false)}
      />
      <DeleteBoardModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSubmit={handleDeleteBoard}
        title={"board"}
        subTitle={`Are you sure you want to delete the ‘${
          allBoards.find((b) => b.id === currentBoardId)?.name ?? ""
        }’ board? This action will remove all columns and tasks and cannot be reversed.`}
      />
      <CreateAddEditBoardModal
        title={modalMode === "edit" ? "Edit" : "Add New"}
        initialName={modalBoardData?.name || ""}
        initialColumns={modalBoardData?.columns?.map((c) => c.name) || ["", ""]}
        onSubmit={
          modalMode === "edit" ? handleEditBoardSubmit : handleCreateTask
        }
        onClose={() => setAddEditModalOpen(false)}
        opened={addEditModalOpen}
      />
      {selectedTask && currentBoard && (
        <CreateTaskBoardModal
          opened={isOpenTaskModal}
          onClose={() => {
            setISOpenTaskModal(false);
            setSelectedTask(null);
          }}
          title={selectedTask.title}
          subTitle={selectedTask.description}
          task={selectedTask}
          columns={currentBoard.columns ?? []}
          onSubtaskToggle={(subtaskId) => {
            setAllBoards((boards) =>
              boards.map((board) =>
                board.id !== currentBoardId
                  ? board
                  : {
                      ...board,
                      columns: board.columns?.map((col) => ({
                        ...col,
                        tasks: col.tasks.map((task) =>
                          task.id !== selectedTask.id
                            ? task
                            : {
                                ...task,
                                subtasks: task.subtasks.map((sub) =>
                                  sub.id === subtaskId
                                    ? { ...sub, isCompleted: !sub.isCompleted }
                                    : sub
                                ),
                              }
                        ),
                      })),
                    }
              )
            );
          }}
          onStatusChange={(newColumnId) => {
            setAllBoards((boards) =>
              boards.map((board) =>
                board.id !== currentBoardId
                  ? board
                  : {
                      ...board,
                      columns: board.columns?.map((col) => ({
                        ...col,
                        tasks:
                          col.id === newColumnId
                            ? [
                                ...col.tasks,
                                { ...selectedTask, columnId: newColumnId },
                              ]
                            : col.tasks.filter(
                                (task) => task.id !== selectedTask.id
                              ),
                      })),
                    }
              )
            );
          }}
          onEdit={() => console.log("Edit task")}
          onDelete={() => console.log("Delete task")}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
}
