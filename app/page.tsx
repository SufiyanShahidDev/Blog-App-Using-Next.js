
"use client";

import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const savedBlogs = JSON.parse(
      localStorage.getItem("blogs") || "[]"
    );

    const savedUser = localStorage.getItem("loggedInUser");

    setBlogs(savedBlogs);

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUserId(user.id);
    }
  }, []);

  function handleDelete(id) {
    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    const user = JSON.parse(savedUser);

    const blog = blogs.find((item) => item.id === id);

    if (!blog || blog.userId !== user.id) {
      alert("You can only delete your own blogs.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedBlogs = blogs.filter(
      (item) => item.id !== id
    );

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    setBlogs(updatedBlogs);
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-950">
          Welcome to Sufiyan's Blog App
        </h1>

        <p className="text-gray-600 mt-3">
          Read stories and ideas shared by our community.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No blogs yet
          </h2>

          <p className="text-gray-500 mt-2">
            Be the first to publish a blog!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              currentUserId={currentUserId}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}