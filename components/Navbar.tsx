
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  }

  return (
    <nav className="bg-blue-950 text-white px-6 py-4 flex flex-wrap justify-between items-center gap-4">
      <Link href="/" className="text-2xl font-bold">
        Sufiyan's Blog App
      </Link>

      <div className="flex flex-wrap items-center gap-5">
        <Link href="/" className="hover:text-blue-300">
          Home
        </Link>

        {user ? (
          <>
            <Link href="/create-blog" className="hover:text-blue-300">
              Create Blog
            </Link>

            <span>Hi, {user.username}</span>

            <button
              onClick={handleLogout}
              className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-300">
              Login
            </Link>

            <Link
              href="/register"
              className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-blue-100"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}