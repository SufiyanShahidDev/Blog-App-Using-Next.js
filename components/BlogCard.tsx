 
"use client";

import Link from "next/link";

export default function BlogCard({ blog, currentUserId, onDelete }) {
  const isOwner = currentUserId === blog.userId;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-xl font-bold text-blue-950 mb-3">
        {blog.title}
      </h2>

      <p className="text-gray-700 whitespace-pre-wrap break-words">
        {blog.content}
      </p>

      <div className="mt-4 pt-3 border-t border-gray-200 text-sm text-gray-500">
        By {blog.author} · {blog.createdAt}
      </div>

      {isOwner && (
        <div className="flex gap-3 mt-4">
          <Link
            href={`/create-blog?edit=${blog.id}`}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(blog.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}