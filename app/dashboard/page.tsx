"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { CSSProperties } from "react";

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

const handleWA = () => {
  const nomor = "6289602971874";
  const pesan = encodeURIComponent(
    "Halo, saya ingin menanyakan jadwal imunisasi anak usia 0–18 tahun."
  );
  window.open(`https://wa.me/${nomor}?text=${pesan}`, "_blank");
};
export default function DashboardPage() {
  const printRef = useRef(null);

  const [user, setUser] = useState<User | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // atau pakai window.devicePixelRatio
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name}_Imunisasi.pdf`);
    } catch (error) {
      console.error("Gagal membuat PDF:", error);
    }
  };
  const thStyle: CSSProperties = {
    border: "1px solid #d1d5db",
    padding: "8px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#374151",
  };

  const tdStyle: CSSProperties = {
    border: "1px solid #d1d5db",
    padding: "8px",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Atas */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full shadow"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Dashboard Imunisasi
              </h1>
              <p className="text-sm text-gray-500 -mt-1">
                Pantau status imunisasi anak Anda
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-sm font-medium text-blue-600 hover:underline flex items-center bg-white px-3 py-1 rounded shadow-sm"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </div>
        {/* Print Ref untuk PDF */}
        {/* Ini akan disembunyikan saat render */}
        <div
          ref={printRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            width: "800px",
            zIndex: -9999,
            fontFamily: "Arial, sans-serif",
            color: "#1f2937", // Tailwind gray-800
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {/* Info Siswa */}
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Nama:</strong> {user.name}
            </p>
            <p>
              <strong>NIK:</strong> {user.nik}
            </p>
            <p>
              <strong>Jenis Kelamin:</strong> {user.gender}
            </p>
            <p>
              <strong>Sekolah:</strong> {user.school}
            </p>
            <p>
              <strong>Kelas:</strong> {user.class}
            </p>
          </div>

          <hr style={{ margin: "1.5rem 0", borderColor: "#d1d5db" }} />

          {/* Status Imunisasi */}
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Status Imunisasi
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #d1d5db",
              fontSize: "13px",
            }}
          >
            <thead style={{ backgroundColor: "#f3f4f6" }}>
              <tr>
                <th style={thStyle}>Kelas</th>
                <th style={thStyle}>Jenis Imunisasi</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>Kelas 1</td>
                <td style={tdStyle}>MR</td>
                <td style={tdStyle}>{user.imunMR}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Kelas 1</td>
                <td style={tdStyle}>DT</td>
                <td style={tdStyle}>{user.imunDT}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Kelas 2</td>
                <td style={tdStyle}>Td</td>
                <td style={tdStyle}>{user.imunTd}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Kelas 5</td>
                <td style={tdStyle}>Td</td>
                <td style={tdStyle}>{user.imunTD}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Kelas 5</td>
                <td style={tdStyle}>HPV 1</td>
                <td style={tdStyle}>{user.imunHPV5}</td>
              </tr>
              <tr>
                <td style={tdStyle}>Kelas 6</td>
                <td style={tdStyle}>HPV</td>
                <td style={tdStyle}>{user.imunHPV6}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer */}
          <div
            style={{
              marginTop: "2rem",
              textAlign: "right",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Dicetak pada:{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Grid Konten */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            {/* Kartu Informasi Pengguna */}
            <div className="     bg-white rounded-2xl shadow p-6 space-y-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800 flex items-center">
                  <i className="fas fa-user-circle mr-2 text-blue-500"></i>
                  Informasi Pengguna
                </h1>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl shadow-sm">
                {/* Avatar + Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-blue-200 shadow">
                    <i className="fas fa-user text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-lg">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">NIK: {user.nik}</p>
                  </div>
                </div>

                {/* Tombol Cetak */}
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition-all duration-200 ease-in-out hover:scale-105"
                >
                  <i className="fas fa-print"></i>
                  Cetak Kartu
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <InfoItem label="Jenis Kelamin" value={user.gender} />
                <InfoItem
                  label="Tanggal Lahir"
                  value={formatDate(user.birthDate)}
                />
                <InfoItem label="Asal Sekolah" value={user.school} />
                <InfoItem label="Kelas" value={user.class} />
              </div>
            </div>

            {/* Kartu Status Imunisasi */}
            <div className="     bg-white rounded-2xl shadow p-6 space-y-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                  <i className="fas fa-syringe mr-2 text-blue-500"></i>
                  Status Imunisasi
                </h3>
                <span
                  className={`${statusBadgeStyle(
                    user.status
                  )} text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  <i className="fas fa-check-circle mr-1"></i> {user.status}
                </span>
              </div>

              <div className="space-y-2">
                <ImunRow label="Kelas 1 - MR" value={user.imunMR} />
                <ImunRow label="Kelas 1 - DT" value={user.imunDT} />
                <ImunRow label="Kelas 2 - Td" value={user.imunTd} />
                <ImunRow label="Kelas 5 - Td" value={user.imunTD} />
                <ImunRow label="Kelas 5 - HPV 1" value={user.imunHPV5} />
                <ImunRow label="Kelas 6 - HPV" value={user.imunHPV6} />
              </div>

              <div className="pt-4 border-t border-gray-100 text-sm text-gray-700 space-y-3">
                <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4h.01M12 4a9 9 0 100 18 9 9 0 000-18z"
                    />
                  </svg>
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Lengkap
                      </span>{" "}
                      jika seluruh Imunisasi telah dilakukan.
                    </p>
                    <p className="font-medium text-gray-800">
                      Jika Imunisasi anak belum lengkap, maka:
                    </p>
                    <ol className="list-decimal list-inside pl-2 space-y-1 text-gray-700">
                      <li>Pastikan sudah memasuki usia imunisasi</li>
                      <li>Imunisasi sesuai jadwal BIAS di sekolah</li>
                      <li>
                        Imunisasi susulan di Puskesmas jika jadwal BIAS terlewat
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Jadwal Imunisasi */}
            <div className="     bg-white rounded-2xl shadow p-6 space-y-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800">
                📅 Jadwal Imunisasi
              </h2>
              <div className="cursor-pointer relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src="/imunisasi.jpeg"
                  alt="Thumbnail"
                  fill
                  className="object-contain"
                  onClick={() => setSelectedImage("/imunisasi.jpeg")}
                />
              </div>

              <div className="text-center text-sm">
                <button
                  onClick={handleWA}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  📆 Klik untuk mendaftar SABI
                </button>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6 ">
            {/* Banner Edukasi Imunisasi Anak SD */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl text-white">
              {/* Background gradasi & efek blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 opacity-90 blur-sm z-0" />

              {/* Konten */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[180px] space-y-3">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                  <i className="fas fa-shield-alt text-white drop-shadow"></i>
                  <h2 className="tracking-wide">IMUNISASI ANAK SD</h2>
                  <i className="fas fa-shield-alt text-white drop-shadow"></i>
                </div>
                <p className="text-sm font-light">
                  Lindungi masa depan mereka!
                </p>
              </div>
            </div>

            {/* Edukasi Imunisasi */}
            <div className="     bg-white rounded-2xl shadow p-6 space-y-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
                <i className="fas fa-book-medical text-green-600"></i>
                Edukasi Imunisasi
              </div>

              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/iEenla9HlNk"
                  title="Edukasi Imunisasi"
                  className="w-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="space-y-4 text-sm text-gray-800">
                <p>
                  <strong>Imunisasi dasar lengkap</strong> tidak berhenti di
                  usia balita! Anak usia sekolah tetap membutuhkan vaksin
                  lanjutan untuk perlindungan maksimal dari penyakit serius.
                </p>
                <div className="cursor-pointer relative w-full h-[700px] rounded-lg overflow-hidden bg-white">
                  <Image
                    src="/poster.png"
                    alt="Thumbnail"
                    fill
                    className="object-contain"
                    onClick={() => setSelectedImage("/poster.png")}
                  />
                </div>

                <p className="text-center text-pink-600 font-semibold">
                  🧡 BANTU ANAK TETAP SEHAT, LENGKAPI IMUNISASINYA! 🧡
                </p>
                <p className="text-pink-600 font-semibold text-center">
                  Cegah penyakit berbahaya sekarang, untuk masa depan yang lebih
                  cerah!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom Gambar */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Preview"
              width={1920}
              height={1080}
              className="rounded-lg shadow-lg w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-80 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Konfirmasi Logout
            </h3>
            <p className="text-sm text-gray-600">
              Apakah Anda yakin ingin keluar dari akun ini?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={() => setShowLogoutModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-gray-500 font-medium">{label}</p>
    <p className="text-gray-800 mt-1">{value}</p>
  </div>
);
