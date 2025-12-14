import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Providers from "./providers";
import "./globals.css"; 
import ClientLayout from "./ClientLayout";
import { Plus_Jakarta_Sans } from 'next/font/google';

export const metadata = {
  title: "Kanban Task Manager",
  description: "Manage tasks visually with boards and columns",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'], // include all weights you need
  variable: '--font-jakarta', // optional CSS variable
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto"/>
      </head>
      <body className={jakarta.className}>
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