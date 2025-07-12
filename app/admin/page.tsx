"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();
  type User = {
    nik: string;
    name: string;
    gender: string;
    birthDate: string;
    school: string;
    class: string;
    imunMR: string;
    imunDT: string;
    imunTd: string;
    imunTD: string;
    imunHPV5: string;
    imunHPV6: string;
    status: string;
  };

  const [form, setForm] = useState<User>({
    nik: "",
    name: "",
    gender: "",
    birthDate: "",
    school: "",
    class: "",
    imunMR: "",
    imunDT: "",
    imunTd: "",
    imunTD: "",
    imunHPV5: "",
    imunHPV6: "",
    status: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [search, setSearch] = useState("");

  const fieldNames = [
    "nik",
    "name",
    "gender",
    "birthDate",
    "school",
    "class",
    "imunMR",
    "imunDT",
    "imunTd",
    "imunTD",
    "imunHPV5",
    "imunHPV6",
    "status",
  ];

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "nik":
        if (!value.trim()) return "NIK wajib diisi";
        if (!/^\d+$/.test(value)) return "NIK harus angka";
        break;
      case "name":
        if (!value.trim()) return "Nama wajib diisi";
        break;
      case "gender":
        if (!value.trim()) return "Jenis kelamin wajib diisi";
        if (!["L", "P"].includes(value.toUpperCase()))
          return "Gender harus L atau P";
        break;
      case "birthDate":
        if (!value.trim()) return "Tanggal lahir wajib diisi";
        break;
      case "class":
        if (!value.trim()) return "Kelas wajib diisi";
        if (!/^\d+$/.test(value)) return "Kelas harus angka";
        break;
      case "status":
        if (!value.trim()) return "Status imunisasi wajib dipilih";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    ["nik", "name", "gender", "birthDate", "class", "status"].forEach(
      (field) => {
        const error = validateField(field, form[field as keyof typeof form]);
        if (error) {
          valid = false;
          newErrors[field] = error;
        }
      }
    );

    setErrors(newErrors);

    if (!valid) {
      toast.error("Periksa kembali input yang tidak valid.");
      return;
    }

    const url = editing
      ? `/api/admin/user/${form.nik}`
      : "/api/admin/create-user";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.message);
      return;
    }

    toast.success(
      editing ? "Data berhasil diupdate!" : "Data berhasil disimpan!"
    );

    setForm({
      nik: "",
      name: "",
      gender: "",
      birthDate: "",
      school: "",
      class: "",
      imunMR: "",
      imunDT: "",
      imunTd: "",
      imunTD: "",
      imunHPV5: "",
      imunHPV6: "",
      status: "",
    });
    setEditing(null);
    fetchUsers();
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditing(user.nik);
    toast.success("Data siap untuk diedit!");
  };

  const handleDelete = (nik: string) => {
    confirmWithToast("Yakin ingin menghapus data ini?", async () => {
      await fetch(`/api/admin/user/${nik}`, { method: "DELETE" });
      toast.success("Data berhasil dihapus!");
      fetchUsers();

      // Reset form jika sedang mengedit data yang dihapus
      if (editing === nik) {
        setForm({
          nik: "",
          name: "",
          gender: "",
          birthDate: "",
          school: "",
          class: "",
          imunMR: "",
          imunDT: "",
          imunTd: "",
          imunTD: "",
          imunHPV5: "",
          imunHPV6: "",
          status: "",
        });
        setEditing(null);
      }
    });
  };

  const confirmWithToast = (message: string, action: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => () => {
      setConfirmOpen(false);
      action();
    });
    setConfirmOpen(true);
  };
  const filteredUsers = users.filter((user) =>
    [user.nik, user.name, user.school, user.class].some((field) =>
      (field || "").toLowerCase().includes(search.toLowerCase())
    )
  );

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
    fetchUsers();
  }, [router]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            Admin - {editing ? "Edit" : "Tambah"} Data User
          </h1>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm text-black bg-gray-200 px-3 py-1 rounded hover:bg-blue-500"
            >
              👤 Admin ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow text-gray-600">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    confirmWithToast("Yakin ingin logout?", () => {
                      localStorage.removeItem("user");
                      toast.success("Berhasil logout!");
                      router.replace("/");
                    });
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          {fieldNames.slice(0, 12).map((name, i) => {
            const label = [
              "NIK",
              "Nama",
              "Jenis Kelamin",
              "Tanggal Lahir",
              "Asal Sekolah",
              "Kelas",
              "Imunisasi MR",
              "Imunisasi DT",
              "Imunisasi Td",
              "Imunisasi TD",
              "HPV Kelas 5",
              "HPV Kelas 6",
            ][i];
            return (
              <div key={name} className="flex flex-col">
                <label className="text-gray-600 mb-1">{label}</label>
                <input
                  name={name}
                  type={name === "birthDate" ? "date" : "text"}
                  value={form[name as keyof typeof form] ?? ""}
                  onChange={handleChange}
                  className={`px-3 py-2 border rounded focus:outline-none ${
                    errors[name]
                      ? "border-red-500 ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  title={errors[name] || ""}
                />
                {errors[name] && (
                  <span className="text-red-500 text-xs mt-1">
                    ❌ {errors[name]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col text-sm text-gray-600">
          <label className="text-gray-600 mb-1">Status Imunisasi</label>
          <select
            name="status"
            value={form.status ?? ""}
            onChange={handleChange}
            className={`px-3 py-2 border rounded focus:outline-none ${
              errors.status
                ? "border-red-500 ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            title={errors.status || ""}
          >
            <option className="text-gray-600 mb-1" value="">
              Pilih Status
            </option>
            <option className="text-gray-600 mb-1" value="Lengkap">
              Lengkap
            </option>
            <option className="text-gray-600 mb-1" value="Tidak Lengkap">
              Tidak Lengkap
            </option>
          </select>
          {errors.status && (
            <span className="text-red-500 text-xs mt-1">
              ❌ {errors.status}
            </span>
          )}
        </div>

        <button
          onClick={() =>
            confirmWithToast(
              editing ? "Yakin ingin update data ini?" : "Yakin ingin simpan?",
              handleSubmit
            )
          }
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {editing ? "Update" : "Simpan"} Data
        </button>
        {editing && (
          <button
            onClick={() =>
              confirmWithToast("Yakin ingin membatalkan edit?", () => {
                setForm({
                  nik: "",
                  name: "",
                  gender: "",
                  birthDate: "",
                  school: "",
                  class: "",
                  imunMR: "",
                  imunDT: "",
                  imunTd: "",
                  imunTD: "",
                  imunHPV5: "",
                  imunHPV6: "",
                  status: "",
                });
                setEditing(null);
                toast.success("Edit dibatalkan.");
              })
            }
            className="w-full py-2 mt-2 rounded bg-red-300 text-white font-semibold hover:bg-red-400 transition flex items-center justify-center gap-2"
          >
            ✖️ Batal Edit
          </button>
        )}

        <div className="pt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Daftar User
          </h2>
          <div className="mb-4 text-gray-800">
            <input
              type="text"
              placeholder="🔍 Cari berdasarkan NIK, Nama, Sekolah, atau Kelas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">NIK</th>
                  <th className="px-4 py-2 whitespace-nowrap">Nama</th>
                  <th className="px-4 py-2 whitespace-nowrap">Jenis Kelamin</th>
                  <th className="px-4 py-2 whitespace-nowrap">Sekolah</th>
                  <th className="px-4 py-2 whitespace-nowrap">Kelas</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-800">
                {filteredUsers.map((user) => (
                  <tr key={user.nik} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">{user.nik}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {user.gender}
                    </td>

                    <td className="px-4 py-2 whitespace-nowrap">
                      {user.school}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {user.class}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {user.status}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap flex gap-2 justify-center">
                      <button
                        className="bg-yellow-400 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(user.nik)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {confirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded shadow-md w-80 space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                {confirmMessage}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-3 py-1 bg-red-300 rounded hover:bg-red-400"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (confirmAction) confirmAction();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
