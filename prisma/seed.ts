import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
     {
      nik: "3171066204131004",
      name: "Tiara Apriliani",
      gender: "Perempuan",
      birthDate: new Date("2013-04-22"),
      school: "Lainya",
      class: "6",
      imunMR: "Sudah",
      imunDT: "Sudah",
      imunTd: "Sudah",
      imunTD: "Sudah",
      imunHPV5: "Belum",
      imunHPV6: "Belum",
      status: "Tidak Lengkap",
      role: "user",
    },
    {
      nik: "3174014301180002",
      name: "Revina Anggaraini",
      gender: "Perempuan",
      birthDate: new Date("2018-01-03"),
      school: "SDN 01",
      class: "2",
      imunMR: "Sudah",
      imunDT: "Belum",
      imunTd: "Belum",
      imunTD: "Belum",
      imunHPV5: "Belum",
      imunHPV6: "Belum",
      status: "Tidak Lengkap",
      role: "user",
    },
    {
      nik: "3174012709170006",
      name: "M.Hafizh Alfarezhi",
      gender: "Laki - Laki",
      birthDate: new Date("2017-09-27"),
      school: "Lainya",
      class: "2",
      imunMR: "Sudah",
      imunDT: "Belum",
      imunTd: "Belum",
      imunTD: "Belum",
      imunHPV5: "Laki - Laki",
      imunHPV6: "Laki - Laki",
      status: "Tidak Lengkap",
      role: "user",
    },
],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
