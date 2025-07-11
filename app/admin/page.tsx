"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    birthDate: "",
    school: "",
    class: "",
    imunMR: "",
    imunDT: "",
    imunTd2: "",
    imunTd5: "",
    imunHPV1: "",
    imunHPV6: "",
    status: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  // ⛔️ Cegah akses selain admin
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.replace("/");
      return;
    }

    const user = JSON.parse(stored);
    if (user.role !== "admin") {
      router.replace("/");
      return;
    }

    setAllowed(true);
    setLoading(false);
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }

    setSuccess(true);
    setError("");
    setForm({
      nik: "",
      name: "",
      gender: "",
      birthDate: "",
      school: "",
      class: "",
      imunMR: "",
      imunDT: "",
      imunTd2: "",
      imunTd5: "",
      imunHPV1: "",
      imunHPV6: "",
      status: "",
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Admin - Tambah Data User
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.replace("/");
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {success && (
          <p className="text-green-600 text-center">
            ✅ Data berhasil disimpan!
          </p>
        )}
        {error && <p className="text-red-500 text-center">❌ {error}</p>}

        <div className="text-black grid grid-cols-2 gap-4">
          <input
            name="nik"
            value={form.nik}
            onChange={handleChange}
            placeholder="NIK"
            className="input"
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama"
            className="input"
          />
          <input
            name="gender"
            value={form.gender}
            onChange={handleChange}
            placeholder="Jenis Kelamin"
            className="input"
          />
          <input
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            type="date"
            className="input"
          />
          <input
            name="school"
            value={form.school}
            onChange={handleChange}
            placeholder="Asal Sekolah"
            className="input"
          />
          <input
            name="class"
            value={form.class}
            onChange={handleChange}
            placeholder="Kelas"
            className="input"
          />
          <input
            name="imunMR"
            value={form.imunMR}
            onChange={handleChange}
            placeholder="MR"
            className="input"
          />
          <input
            name="imunDT"
            value={form.imunDT}
            onChange={handleChange}
            placeholder="DT"
            className="input"
          />
          <input
            name="imunTd2"
            value={form.imunTd2}
            onChange={handleChange}
            placeholder="Td Kelas 2"
            className="input"
          />
          <input
            name="imunTd5"
            value={form.imunTd5}
            onChange={handleChange}
            placeholder="Td Kelas 5"
            className="input"
          />
          <input
            name="imunHPV1"
            value={form.imunHPV1}
            onChange={handleChange}
            placeholder="HPV 1"
            className="input"
          />
          <input
            name="imunHPV6"
            value={form.imunHPV6}
            onChange={handleChange}
            placeholder="HPV Kelas 6"
            className="input"
          />
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input text-black"
        >
          <option value="">Pilih Status Imunisasi</option>
          <option value="Lengkap">Lengkap</option>
          <option value="Tidak Lengkap">Tidak Lengkap</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Simpan Data
        </button>
      </div>
    </main>
  );
}
