"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  nik: string;
  gender?: string;
  birthDate?: string;
  school?: string;
  class?: string;
  imunMR?: string;
  imunDT?: string;
  imunTd2?: string;
  imunTd5?: string;
  imunHPV1?: string;
  imunHPV6?: string;
  status?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.replace("/");
    } else {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, [router]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!user) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-700">Informasi Pengguna</h1>

        <div className="space-y-2 text-sm text-black">
          <p>
            <strong>Nama:</strong> {user.name}
          </p>
          <p>
            <strong>NIK:</strong> {user.nik}
          </p>
          <p>
            <strong>Jenis Kelamin:</strong> {user.gender ?? "-"}
          </p>
          <p>
            <strong>Tanggal Lahir:</strong> {formatDate(user.birthDate)}
          </p>
          <p>
            <strong>Asal Sekolah:</strong> {user.school}
          </p>
          <p>
            <strong>Kelas:</strong> {user.class}
          </p>
        </div>

        <hr />

        <div className="text-black space-y-2 text-sm">
          <p>
            <strong>Imunisasi Kelas 1 - MR:</strong> {user.imunMR}
          </p>
          <p>
            <strong>Imunisasi Kelas 1 - DT:</strong> {user.imunDT}
          </p>
          <p>
            <strong>Imunisasi Kelas 2 - Td:</strong> {user.imunTd2}
          </p>
          <p>
            <strong>Imunisasi Kelas 5 - Td:</strong> {user.imunTd5}
          </p>
          <p>
            <strong>Imunisasi Kelas 5 - HPV 1:</strong> {user.imunHPV1}
          </p>
          <p>
            <strong>Imunisasi Kelas 6 - HPV:</strong> {user.imunHPV6}
          </p>
        </div>

        <div className="pt-4">
          <p className="text-red-600 font-bold">
            Status Imunisasi: {user.status}
          </p>
        </div>

        <div className="pt-4 text-xs text-gray-600">
          <p>
            📝 <strong>Catatan:</strong>
          </p>
          <ol className="list-decimal ml-5 space-y-1 mt-1">
            <li>
              Jika belum lengkap dapat melengkapi imunisasi dengan datang ke{" "}
              <strong>Puskesmas Manggarai Selatan</strong>.
            </li>
            <li>
              Jika ada data yang salah dapat memperbaiki dengan menghubungi{" "}
              <strong>dr. Rachma - 08158357156</strong>.
            </li>
          </ol>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
