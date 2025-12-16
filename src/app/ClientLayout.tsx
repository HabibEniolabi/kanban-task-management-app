"use client";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BoardIcon from "../assets/icon/board";
import { Board } from "../components/SidebarCommon/BoardSesction";
import CreateBoardModal from "../components/Modals/CreateBoardModal";
import DeleteBoardModal from "../components/Modals/DeleteBoardModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const [currentBoardId, setCurrentBoardId] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [createBoardModalOpen, setCreateBoardModalOpen] =
    useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

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
        const jsonBoards = (json?.boards ?? []) as Array<{ name: string }>;

        const mappedBoards: Board[] = jsonBoards.map((board, index) => ({
          id: String(index + 1),
          name: board.name,
          icon: <BoardIcon color="#828FA3" />,
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

  const handleSelectBoard = useCallback((boardId: string) => {
    setCurrentBoardId(boardId);
  }, []);

  const handleHideSidebar = useCallback(() => {
    setIsSidebarVisible(!isSidebarVisible);
  }, [isSidebarVisible]);

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

  const handleAddTask = useCallback(() => {
    console.log("Yeah. Task added");
    // Add your actual task logic here
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
        {isSidebarVisible && (
          <Sidebar
            boards={allBoards}
            currentBoardId={currentBoardId}
            onSelectBoard={handleSelectBoard}
            onHideSidebar={handleHideSidebar}
            onCreateBoard={openCreateBoardModal}
          />
        )}
        <main className={`w-full`}>{children}</main>
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
    </div>
  );
}
