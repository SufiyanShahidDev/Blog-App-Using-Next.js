// @ts-nocheck
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email === cleanEmail
    );

    if (existingUser) {
      setMessage("This email is already registered.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      email: cleanEmail,
      password: password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "/login";
  }

  return (
    <main className="max-w-md mx-auto mt-12 px-5">
      <div className="bg-white shadow-sm border rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-950 mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

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
            minLength={6}
            required
          />

          {message && (
            <p className="text-red-600 text-sm">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-800 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}