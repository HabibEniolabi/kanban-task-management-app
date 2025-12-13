// 'use client'
// import "@mantine/core/styles.css";
// import { ColorSchemeScript, MantineProvider } from "@mantine/core";
// import { ModalsProvider } from "@mantine/modals";
// import Sidebar from "../components/Sidebar";
// import Providers from "./providers";
// import BoardIcon from "../assets/icon/board";
// import { Board } from "../components/SidebarCommon/BoardSesction";
// import { useState } from "react";
// import Header from "../components/Header";


// const metadata = {
// title: "Kanban Task Manager",
// description: "Manage tasks visually with boards and columns",
// };

// export const mockBoards: Board[] = [
//     { id: '1', name: 'Platform Launch', icon: <BoardIcon color="#828FA3" /> },
//     { id: '2', name: 'Marketing Plan', icon: <BoardIcon color="#828FA3" />  },
//     { id: '3', name: 'Roadmap', icon: <BoardIcon color="#828FA3" />  },
// ];


// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const [allBoards, setAllBoards] = useState<Board[]>(mockBoards);
//   const [currentBoardId, setCurrentBoardId] = useState<string>(mockBoards[0].id);
//   const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

//   const handleSelectBoard = (boardId: string) => {
//         setCurrentBoardId(boardId);
//         console.log(`Selected Board: ${boardId}`);
//     };
//  const handleHideSidebar = () => {
//       setIsSidebarVisible(!isSidebarVisible);
//     }

//   const handleCreateBoard = () => {
//     const newBoardId = (allBoards.length + 1).toString();
//     const newBoard: Board = {
//       id: newBoardId,
//       name: `New Board ${newBoardId}`,
//       icon: <BoardIcon color="#828FA3" />,
//     };
//     setAllBoards([...allBoards, newBoard]);
//     setCurrentBoardId(newBoardId);
//   }
// return (
//   <html lang="en">
//     <head>
//       <ColorSchemeScript defaultColorScheme="auto"/>
//     </head>
//     <body>
//       <MantineProvider>
//         <ModalsProvider>
//           <Providers>
//             <div className="flex min-h-screen">
//               {isSidebarVisible && (
//                 <Sidebar 
//                   boards={allBoards}
//                   currentBoardId={currentBoardId}
//                   onSelectBoard={handleSelectBoard}
//                   onHideSidebar={handleHideSidebar} 
//                   onCreateBoard={handleCreateBoard}             
//                 />
//                )}
//               <div className="flex flex-col">
//                 <Header 
//                   currentBoard={allBoards.find(b => b.id === currentBoardId)}
//                   onAddTask={() => console.log('Yeah. Task added')} 
//                   onOpenBoardMenu={() => console.log('Nice') }                />
//                 <main>{children}</main>
//               </div>
//             </div>
//           </Providers>
//         </ModalsProvider>
//       </MantineProvider>
//     </body>
//   </html>
// )
// }

// app/layout.tsx (Server Component - REMOVE 'use client')
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Providers from "./providers";
import "./globals.css"; // Import global styles
import ClientLayout from "./ClientLayout"; // Move client logic here

export const metadata = {
  title: "Kanban Task Manager",
  description: "Manage tasks visually with boards and columns",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto"/>
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}