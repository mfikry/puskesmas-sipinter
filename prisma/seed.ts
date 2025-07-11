import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { nik: "3275046305170006" },
    update: {},
    create: {
      nik: "3275046305170006",
      name: "Jessy Alberga Kamalsah",
      gender: "Perempuan",
      birthDate: new Date("2017-05-23"),
      school: "SDN 01",
      class: "1A",

      imunMR: "Sudah",
      imunDT: "Sudah",
      imunTd2: "Belum",
      imunTd5: "Belum",
      imunHPV1: "Belum",
      imunHPV6: "Belum",

      status: "Tidak Lengkap",
    }
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
