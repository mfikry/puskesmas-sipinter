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
  imunTd?: string;
  imunTD?: string;
  imunHPV5?: string;
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

  if (loading) return <p className="text-center py-10">Loading...</p>;
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

  const statusBadgeStyle =
    user.status === "Complete"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Informasi Pengguna
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/");
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Profile section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.nik}</p>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Jenis Kelamin</p>
              <p className="text-gray-800">{user.gender ?? "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Tanggal Lahir</p>
              <p className="text-gray-800">{formatDate(user.birthDate)}</p>
            </div>
            <div>
              <p className="text-gray-500">Asal Sekolah</p>
              <p className="text-gray-800">{user.school ?? "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Kelas</p>
              <p className="text-gray-800">{user.class ?? "-"}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                Status Imunisasi
              </h3>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusBadgeStyle}`}
              >
                {user.status ?? "-"}
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

          {/* Notes */}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
            <div className="flex items-start space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p>
                  Jika belum lengkap, datang ke{" "}
                  <span className="text-blue-600">
                    Puskesmas Manggarai Selatan
                  </span>
                  .
                </p>
                <p>
                  Jika ada kesalahan data, hubungi{" "}
                  <span className="text-blue-600">
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

// Komponen reusable untuk baris imunisasi
function ImunRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value ?? "-"}</span>
    </div>
  );
}
