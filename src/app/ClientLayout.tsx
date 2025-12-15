"use client";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BoardIcon from "../assets/icon/board";
import { Board } from "../components/SidebarCommon/BoardSesction";
import CreateBoardModal from "../components/Modals/CreateBoardModal";

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
    console.log(`Selected Board: ${boardId}`);
  }, []);

  const handleHideSidebar = useCallback(() => {
    setIsSidebarVisible(!isSidebarVisible);
  }, [isSidebarVisible]);

  const handleCreateBoard = useCallback(
    (name: string) => {
      const newBoardId = (allBoards.length + 1).toString();
      const newBoard: Board = {
        id: newBoardId,
        name,
        icon: <BoardIcon color="#828FA3" />,
      };
      setAllBoards([...allBoards, newBoard]);
      setCurrentBoardId(newBoardId);
    },
    [allBoards]
  );

  const handleAddTask = useCallback(() => {
    console.log("Yeah. Task added");
    // Add your actual task logic here
  }, []);

  const handleOpenBoardMenu = useCallback(() => {
    console.log("Nice");
    // Add your actual task logic here
  }, []);

  const openCreateBoardModal = () => {
    setCreateBoardModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full">
        <Header
          currentBoard={allBoards.find((b) => b.id === currentBoardId)}
          onAddTask={handleAddTask}
          onOpenBoardMenu={handleOpenBoardMenu}
        />
      </div>
      <div className="flex flex-1">
        {isSidebarVisible && (
          <>
            <Sidebar
              boards={allBoards}
              currentBoardId={currentBoardId}
              onSelectBoard={handleSelectBoard}
              onHideSidebar={handleHideSidebar}
              onCreateBoard={openCreateBoardModal}
            />
            <CreateBoardModal
              opened={createBoardModalOpen}
              onClose={() => setCreateBoardModalOpen(false)}
              onSubmit={(name) => {
                setCreateBoardModalOpen(false);
                handleCreateBoard(name);
              }}
            />
          </>
        )}
        <main className={`w-full`}>{children}</main>
      </div>
    </div>
  );
}
