// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

export default function CreateBlog() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const loggedInUser = JSON.parse(savedUser);

    setUser(loggedInUser);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("edit");

    if (id) {
      const blogs = JSON.parse(
        localStorage.getItem("blogs") || "[]"
      );

      const blog = blogs.find((item) => item.id === id);

      if (!blog || blog.userId !== loggedInUser.id) {
        alert("You can only edit your own blogs.");
        window.location.href = "/";
        return;
      }

      setEditId(id);
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const savedUser = localStorage.getItem("loggedInUser");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const loggedInUser = JSON.parse(savedUser);

    const blogs = JSON.parse(
      localStorage.getItem("blogs") || "[]"
    );

    if (editId) {
      const blog = blogs.find((item) => item.id === editId);

      if (!blog || blog.userId !== loggedInUser.id) {
        alert("You can only edit your own blogs.");
        window.location.href = "/";
        return;
      }

      const updatedBlogs = blogs.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            title: title,
            content: content,
          };
        }

        return item;
      });

      localStorage.setItem(
        "blogs",
        JSON.stringify(updatedBlogs)
      );

      alert("Blog updated successfully!");
    } else {
      const newBlog = {
        id: Date.now().toString(),
        title: title,
        content: content,
        author: loggedInUser.username,
        userId: loggedInUser.id,
        createdAt: new Date().toLocaleDateString(),
      };

      blogs.unshift(newBlog);

      localStorage.setItem("blogs", JSON.stringify(blogs));

      alert("Blog published successfully!");
    }

    window.location.href = "/";
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Checking login...
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">
          {editId ? "Edit Blog" : "Create a Blog"}
        </h1>

        <p className="text-gray-600 mb-6">
          Share your ideas with the community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-2">
              Blog Title
            </label>

            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Blog Content
            </label>

            <textarea
              placeholder="Write your blog here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg h-56 resize-y focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            {editId ? "Update Blog" : "Publish Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}