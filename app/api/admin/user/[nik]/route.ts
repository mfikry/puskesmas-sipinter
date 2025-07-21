import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// @ts-expect-error: context param tidak terketik
export async function PUT(req: NextRequest, context) {
  const nikLama = context.params.nik;

  try {
    const body = await req.json();
    const nikBaru = body.nik;

    // Validasi tanggal lahir jika ada
    if (body.birthDate && isNaN(Date.parse(body.birthDate))) {
      return NextResponse.json(
        { message: "Tanggal lahir tidak valid" },
        { status: 400 }
      );
    }

    // Kalau nikBaru beda dengan nikLama, cek apakah sudah dipakai user lain
    if (nikBaru !== nikLama) {
      const existing = await prisma.user.findUnique({
        where: { nik: nikBaru },
      });

      if (existing) {
        return NextResponse.json(
          { message: "NIK sudah terdaftar" },
          { status: 400 }
        );
      }
    }

    // Lakukan update data
    const updated = await prisma.user.update({
      where: { nik: nikLama },
      data: {
        ...body,
        birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("PUT /user error:", error);

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "NIK sudah terdaftar" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "Terjadi Kesalahan" },
      { status: 500 }
    );
  }
}


// @ts-expect-error: Next.js App Router requires untyped context to avoid build issues
export async function DELETE(req: NextRequest, context) {
  const { nik } = context.params;

  await prisma.user.delete({
    where: { nik },
  });

  return NextResponse.json({ message: "User deleted" });
}
