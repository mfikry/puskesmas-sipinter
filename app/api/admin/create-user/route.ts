import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const exists = await prisma.user.findUnique({
      where: { nik: data.nik },
    });

    if (exists) {
      return NextResponse.json({ message: "User dengan NIK ini sudah ada" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
