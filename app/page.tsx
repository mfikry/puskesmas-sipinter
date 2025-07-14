"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

export default function LoginPage() {
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.jpeg"
            alt="Logo Si-Pintar"
            className="h-15 w-auto mb-2"
            width={100}
            height={50}
          />
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Sign in to Si-Pinter
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NIK */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">NIK</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fas fa-id-card"></i>
              </span>
              <input
                type="text"
                placeholder="Masukkan NIK"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="pl-10 w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Nama</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                placeholder="Masukkan Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            Masuk <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pt-4">
          © 2025 Si-Pinter Mangsel. All rights reserved.
        </p>
      </div>
    </main>
  );
}
