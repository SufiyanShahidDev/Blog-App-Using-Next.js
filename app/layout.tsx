// @ts-nocheck

import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Sufiyan's Blog App",
  description: "A simple blog application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}