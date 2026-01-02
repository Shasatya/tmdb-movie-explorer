import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { ThemeManager } from "@/components/ThemeManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TMDB Movie Explorer",
  description: "Browse and discover movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeManager />
          {children}
        </StoreProvider>{" "}
      </body>
    </html>
  );
}
