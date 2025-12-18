"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Providers from "./providers";
import ClientLayout from "./ClientLayout";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { useSystemColorScheme } from "@/src/hooks/useSystemColorScheme";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();

  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme={systemScheme} />
      </head>
      <body className={jakarta.className}>
        <MantineProvider
          theme={{}}
          defaultColorScheme={systemScheme}
        >
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
