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

  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isOpenTaskModal, setISOpenTaskModal] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [deleteModalMode, setDeleteModalMode] = useState<"create" | "edit">(
    "create"
  );
  const [modalBoardData, setModalBoardData] = useState<Board | null>(null);

  const currentBoard = allBoards.find((b) => b.id === currentBoardId);
  const selectedTask =
    currentBoard?.columns
      ?.flatMap((c) => c.tasks)
      .find((t) => t.id === selectedTaskId) ?? null;

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
    setSelectedTaskId(null);
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

  const openEditTaskModal = useCallback(() => {
    setISOpenTaskModal(false);
    setModalMode("edit");
    setAddEditModalOpen(true);
  }, []);

  const handleEditBoardSubmit = useCallback(
    (name: string, columns: string[] = []) => {
      setAllBoards((boards) =>
        boards.map((board) => {
          if (board.id !== currentBoardId) return board;

          const existingColumns = board.columns ?? [];

          const updatedColumns = columns.map((colName, index) => {
            const existing = existingColumns[index];

            return existing
              ? { ...existing, name: colName }
              : {
                  id: `col-${Date.now()}-${index}`,
                  name: colName,
                  tasks: [],
                };
          });

          return {
            ...board,
            name,
            columns: updatedColumns,
          };
        })
      );

      setCreateBoardModalOpen(false);
    },
    [currentBoardId]
  );

  const handleEditTaskSubmit = useCallback(
    (
      title: string,
      description: string,
      newColumnId: string,
      subtasks: { title: string }[]
    ) => {
      if (!currentBoardId || !selectedTask) return;

      const sourceColumnId = selectedTask.columnId;

      setAllBoards((boards) =>
        boards.map((board) => {
          if (board.id !== currentBoardId) return board;

          // 🔹 SAME COLUMN → update in place
          if (sourceColumnId === newColumnId) {
            return {
              ...board,
              columns: board.columns?.map((col) =>
                col.id !== sourceColumnId
                  ? col
                  : {
                      ...col,
                      tasks: col.tasks.map((task) =>
                        task.id !== selectedTask.id
                          ? task
                          : {
                              ...task,
                              title,
                              description,
                              status: col.name,
                              subtasks: subtasks.map((s, i) => ({
                                id:
                                  task.subtasks[i]?.id ??
                                  `subtask-${Date.now()}-${i}`,
                                title: s.title,
                                isCompleted:
                                  task.subtasks[i]?.isCompleted ?? false,
                              })),
                            }
                      ),
                    }
              ),
            };
          }

          // 🔹 COLUMN CHANGED → remove + add
          return {
            ...board,
            columns: board.columns?.map((col) => {
              if (col.id === sourceColumnId) {
                return {
                  ...col,
                  tasks: col.tasks.filter((t) => t.id !== selectedTask.id),
                };
              }

              if (col.id === newColumnId) {
                return {
                  ...col,
                  tasks: [
                    ...col.tasks,
                    {
                      ...selectedTask,
                      title,
                      description,
                      columnId: newColumnId,
                      status: col.name,
                      subtasks: subtasks.map((s, i) => ({
                        id:
                          selectedTask.subtasks[i]?.id ??
                          `subtask-${Date.now()}-${i}`,
                        title: s.title,
                        isCompleted:
                          selectedTask.subtasks[i]?.isCompleted ?? false,
                      })),
                    },
                  ],
                };
              }

              return col;
            }),
          };
        })
      );

      setSelectedTaskId(null);
      setAddEditModalOpen(false);
    },
    [currentBoardId, selectedTask]
  );

  const openDeleteBoardModal = useCallback(() => {
    setDeleteModalOpen(true);
    setDeleteModalMode("create");
  }, []);

  const onDeleteTaskModal = useCallback(() => {
    if (!selectedTaskId || !currentBoardId) return;

    setDeleteModalOpen(true);
    setISOpenTaskModal(false);
    setDeleteModalMode("edit");
  }, [selectedTaskId, currentBoardId]);

  const confirmDeleteTask = useCallback(() => {
    if (!selectedTask || !currentBoardId) return;

    setAllBoards((boards) =>
      boards.map((board) =>
        board.id !== currentBoardId
          ? board
          : {
              ...board,
              columns: board.columns?.map((col) =>
                col.id !== selectedTask.columnId
                  ? col
                  : {
                      ...col,
                      tasks: col.tasks.filter(
                        (task) => task.id !== selectedTask.id
                      ),
                    }
              ),
            }
      )
    );

    setSelectedTaskId(null);
    setDeleteModalOpen(false);
  }, [selectedTask, currentBoardId]);

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
    (
      title: string,
      description: string,
      columnId: string,
      subtasks: { title: string }[]
    ) => {
      if (!currentBoardId) return;

      const column = currentBoard?.columns?.find((c) => c.id === columnId);

      const newTask: Task = {
        id: `task-${Date.now()}`,
        title,
        description,
        status: column?.name ?? "",
        boardId: currentBoardId,
        columnId,
        subtasks: subtasks.map((sub, index) => ({
          id: `subtask-${Date.now()}-${index}`,
          title: sub.title,
          isCompleted: false,
        })),
      };

      setAllBoards((boards) =>
        boards.map((board) =>
          board.id !== currentBoardId
            ? board
            : {
                ...board,
                columns: board.columns?.map((col) =>
                  col.id === columnId
                    ? { ...col, tasks: [...col.tasks, newTask] }
                    : col
                ),
              }
        )
      );

      setAddEditModalOpen(false);
    },
    [currentBoardId, currentBoard]
  );

  const handleOpenTask = useCallback((task: Task) => {
    setISOpenTaskModal(true);
    setSelectedTaskId(task.id);
  }, []);

  const handleAddColumn = useCallback(() => {
    if (!currentBoardId) return;

    setAllBoards((boards) =>
      boards.map((board) =>
        board.id !== currentBoardId
          ? board
          : {
              ...board,
              columns: [
                ...(board.columns ?? []),
                {
                  id: `col-${Date.now()}`,
                  name: "New Column",
                  tasks: [],
                },
              ],
            }
      )
    );
  }, [currentBoardId]);

  const moveTask = (taskId: string, newColumnId: string) => {
    setAllBoards((boards) =>
      boards.map((board) =>
        board.id !== currentBoardId
          ? board
          : {
              ...board,
              columns: board.columns?.map((col) => {
                // remove from old column
                if (col.tasks.some((t) => t.id === taskId)) {
                  return {
                    ...col,
                    tasks: col.tasks.filter((t) => t.id !== taskId),
                  };
                }

                // add to new column
                if (col.id === newColumnId) {
                  const task = boards
                    .flatMap((b) => b.columns ?? [])
                    .flatMap((c) => c.tasks)
                    .find((t) => t.id === taskId);

                  if (!task) return col;

                  return {
                    ...col,
                    tasks: [
                      ...col.tasks,
                      {
                        ...task,
                        columnId: newColumnId,
                        status: col.name,
                      },
                    ],
                  };
                }

                return col;
              }),
            }
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full">
        <Header
          currentBoard={allBoards.find((b) => b.id === currentBoardId)}
          onAddTask={handleAddTask}
          onEditBoard={openEditBoardModal}
          onDeleteBoard={openDeleteBoardModal}
          isSidebarVisible={isSidebarVisible}
          boards={allBoards}
          currentBoardId={currentBoardId}
          onCreateBoard={openCreateBoardModal}
          onSelectBoard={handleSelectBoard}
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
        <main
          className={`w-full flex-1 overflow-x-auto dark:bg-[#1f202b] bg-[#F4F7FD]`}
        >
          {currentBoard && (
            <BoardPage
              onMoveTask={moveTask}
              board={currentBoard}
              onOpenTask={handleOpenTask}
              onClick={handleAddColumn}
            />
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
        onSubmit={
          deleteModalMode === "edit" ? confirmDeleteTask : handleDeleteBoard
        }
        title={deleteModalMode === "edit" ? "task" : "board"}
        subTitle={
          deleteModalMode === "edit"
            ? `Are you sure you want to delete the ‘${
                selectedTask?.title.split(" ").slice(0, 3).join(" ") ?? ""
              }’ task and its subtasks?  This action cannot be reversed.`
            : `Are you sure you want to delete the ‘${
                allBoards.find((b) => b.id === currentBoardId)?.name ?? ""
              }’ board? This action will remove all columns and tasks and cannot be reversed.`
        }
      />
      {currentBoard && (
        <CreateAddEditBoardModal
          title={selectedTask ? "Edit" : "Add New"}
          task={selectedTask}
          onSubmit={selectedTask ? handleEditTaskSubmit : handleCreateTask}
          onClose={() => {
            setAddEditModalOpen(false);
            setSelectedTaskId(null);
          }}
          opened={addEditModalOpen}
          columns={currentBoard.columns ?? []}
        />
      )}
      {selectedTask && currentBoard && (
        <CreateTaskBoardModal
          opened={isOpenTaskModal}
          onClose={() => {
            setISOpenTaskModal(false);
            setSelectedTaskId(null);
          }}
          title={selectedTask.title}
          subTitle={selectedTask.description}
          task={selectedTask}
          columns={currentBoard.columns ?? []}
          /* ✅ SUBTASK TOGGLE — single source of truth */
          onSubtaskToggle={(subtaskId) => {
            setAllBoards((boards) =>
              boards.map((board) =>
                board.id !== currentBoardId
                  ? board
                  : {
                      ...board,
                      columns: board.columns?.map((col) =>
                        col.id !== selectedTask.columnId
                          ? col
                          : {
                              ...col,
                              tasks: col.tasks.map((task) =>
                                task.id !== selectedTask.id
                                  ? task
                                  : {
                                      ...task,
                                      subtasks: task.subtasks.map((sub) =>
                                        sub.id === subtaskId
                                          ? {
                                              ...sub,
                                              isCompleted: !sub.isCompleted,
                                            }
                                          : sub
                                      ),
                                    }
                              ),
                            }
                      ),
                    }
              )
            );
          }}
          /* ✅ STATUS CHANGE — safe move between columns */
          onStatusChange={(newColumnId) => {
            setAllBoards((boards) =>
              boards.map((board) => {
                if (board.id !== currentBoardId) return board;

                return {
                  ...board,
                  columns: board.columns?.map((col) => {
                    // remove from old column
                    if (col.id === selectedTask.columnId) {
                      return {
                        ...col,
                        tasks: col.tasks.filter(
                          (t) => t.id !== selectedTask.id
                        ),
                      };
                    }

                    // add to new column
                    if (col.id === newColumnId) {
                      return {
                        ...col,
                        tasks: [
                          ...col.tasks,
                          {
                            ...selectedTask,
                            columnId: newColumnId,
                            status: col.name,
                          },
                        ],
                      };
                    }

                    return col;
                  }),
                };
              })
            );
          }}
          onEdit={openEditTaskModal}
          onDelete={onDeleteTaskModal}
        />
      )}
    </div>
  );
}
