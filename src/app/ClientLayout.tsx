// app/ClientLayout.tsx (Client Component)
'use client'
import { useCallback, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BoardIcon from "../assets/icon/board";
import { Board } from "../components/SidebarCommon/BoardSesction";

export const mockBoards: Board[] = [
    { id: '1', name: 'Platform Launch', icon: <BoardIcon color="#828FA3" /> },
    { id: '2', name: 'Marketing Plan', icon: <BoardIcon color="#828FA3" />  },
    { id: '3', name: 'Roadmap', icon: <BoardIcon color="#828FA3" />  },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [allBoards, setAllBoards] = useState<Board[]>(mockBoards);
  const [currentBoardId, setCurrentBoardId] = useState<string>(mockBoards[0].id);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const handleSelectBoard = useCallback((boardId: string) => {
    setCurrentBoardId(boardId);
    console.log(`Selected Board: ${boardId}`);
  }, []);
  
  const handleHideSidebar = useCallback(() => {
    setIsSidebarVisible(!isSidebarVisible);
  }, [isSidebarVisible]);

  const handleCreateBoard = useCallback(() => {
    const newBoardId = (allBoards.length + 1).toString();
    const newBoard: Board = {
      id: newBoardId,
      name: `New Board ${newBoardId}`,
      icon: <BoardIcon color="#828FA3" />,
    };
    setAllBoards([...allBoards, newBoard]);
    setCurrentBoardId(newBoardId);
  }, [allBoards]);

  const handleAddTask = useCallback(() => {
    console.log('Yeah. Task added');
    // Add your actual task logic here
  }, []);

  const handleOpenBoardMenu = useCallback(() => {
    console.log('Nice');
    // Add your actual task logic here
  }, []);

  return (
    <div className="flex min-h-screen">
      {isSidebarVisible && (
        <Sidebar 
          boards={allBoards}
          currentBoardId={currentBoardId}
          onSelectBoard={handleSelectBoard}
          onHideSidebar={handleHideSidebar} 
          onCreateBoard={handleCreateBoard}             
        />
      )}
      <div className="flex flex-col">
        <Header 
          currentBoard={allBoards.find(b => b.id === currentBoardId)}
          onAddTask={handleAddTask} 
          onOpenBoardMenu={handleOpenBoardMenu}               
        />
        <main>{children}</main>
      </div>
    </div>
  );
}