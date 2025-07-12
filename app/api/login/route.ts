import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { nik, name } = await req.json();

  const user = await prisma.user.findUnique({
    where: { nik },
  });

  if (!user || user.name.toLowerCase() !== name.toLowerCase()) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Kirim hanya data yang dibutuhkan (untuk keamanan)
  return NextResponse.json({
  user: {
    id: user.id,
    nik: user.nik,
    name: user.name,
    role: user.role,
    gender: user.gender,
    birthDate: user.birthDate,
    school: user.school,
    class: user.class,
    imunMR: user.imunMR,
    imunDT: user.imunDT,
    imunTd: user.imunTd,
    imunTD: user.imunTD,
    imunHPV5: user.imunHPV5,
    imunHPV6: user.imunHPV6,
    status: user.status,
  }
});

}
