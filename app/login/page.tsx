// @ts-nocheck
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const cleanEmail = email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    if (!user) {
      setMessage("Invalid email or password.");
      return;
    }

    const loggedInUser = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedInUser)
    );

    window.location.href = "/create-blog";
  }

  return (
    <main className="max-w-md mx-auto mt-12 px-5">
      <div className="bg-white shadow-sm border rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          {message && (
            <p className="text-red-600 text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-800 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}