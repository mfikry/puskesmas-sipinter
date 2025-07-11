"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ nik, name }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      setError("NIK atau nama salah");
      return;
    }

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-sky-100 to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
            {error}
          </div>
        )}
        <div className="space-y-4 text-black">
          <input
            type="text"
            placeholder="Masukkan NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Masukkan Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Masuk
          </button>
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          © 2025 Aplikasi NIK Login
        </p>
      </div>
    </main>
  );
}
