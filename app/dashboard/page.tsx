"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface User {
  name: string;
  nik: string;
  gender: string;
  birthDate: string;
  school: string;
  class: string;
  status: string;
  imunMR: string;
  imunDT: string;
  imunTd: string;
  imunTD: string;
  imunHPV5: string;
  imunHPV6: string;
}

const statusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "lengkap":
      return "bg-emerald-50 text-emerald-600";
    case "belum":
      return "bg-red-50 text-red-600";
    case "menunggu":
      return "bg-yellow-50 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ImunRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition">
      <span className="text-gray-700">{label}</span>
      <span
        className={`${
          value === "Sudah"
            ? "bg-emerald-50 text-emerald-600"
            : value === "Menunggu"
            ? "bg-yellow-50 text-yellow-600"
            : "bg-red-50 text-red-600"
        } px-2 py-1 rounded-full text-xs font-medium`}
      >
        {value === "Sudah" && <i className="fas fa-check mr-1"></i>}
        {value === "Menunggu" && <i className="fas fa-clock mr-1"></i>}
        {value === "Belum" && <i className="fas fa-times mr-1"></i>}
        {value}
      </span>
    </div>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat data pengguna...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow p-6 space-y-6 transition-all duration-300 hover:shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <i className="fas fa-user-circle mr-2 text-blue-500"></i>
              Informasi Pengguna
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/");
              }}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center"
            >
              <i className="fas fa-sign-out-alt mr-1"></i>
              Logout
            </button>
          </div>

          {/* Profile section */}
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner border-2 border-blue-100">
              <i className="fas fa-user text-blue-400 text-xl"></i>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">NIK: {user.nik}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium">Jenis Kelamin</p>
              <p className="text-gray-800 mt-1">{user.gender}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium">Tanggal Lahir</p>
              <p className="text-gray-800 mt-1">{formatDate(user.birthDate)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium">Asal Sekolah</p>
              <p className="text-gray-800 mt-1">{user.school}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 font-medium">Kelas</p>
              <p className="text-gray-800 mt-1">{user.class}</p>
            </div>
          </div>

          {/* Status Imunisasi */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-700 flex items-center">
                <i className="fas fa-syringe mr-2 text-blue-500"></i>
                Status Imunisasi
              </h3>
              <span
                className={`${statusBadgeStyle(
                  user.status
                )} text-xs font-semibold px-3 py-1 rounded-full`}
              >
                <i className="fas fa-check-circle mr-1"></i>
                {user.status}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <ImunRow label="Kelas 1 - MR" value={user.imunMR} />
              <ImunRow label="Kelas 1 - DT" value={user.imunDT} />
              <ImunRow label="Kelas 2 - Td" value={user.imunTd} />
              <ImunRow label="Kelas 5 - Td" value={user.imunTD} />
              <ImunRow label="Kelas 5 - HPV 1" value={user.imunHPV5} />
              <ImunRow label="Kelas 6 - HPV" value={user.imunHPV6} />
            </div>
          </div>

          {/* Notes & Button */}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
            <div className="flex items-start space-x-3 bg-yellow-50 p-3 rounded-lg">
              <i className="fas fa-exclamation-circle text-yellow-500 mt-0.5 text-lg"></i>
              <div>
                <p>
                  Jika belum lengkap, datang ke{" "}
                  <span className="text-blue-600 font-medium">
                    Puskesmas Manggarai Selatan
                  </span>
                  .
                </p>
                <p>
                  Jika ada kesalahan data, hubungi{" "}
                  <span className="text-blue-600 font-medium">
                    dr. Rachma - 08158357156
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
