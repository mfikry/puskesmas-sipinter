import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// @ts-expect-error: Next.js App Router doesn't support typing context in handler param
export async function PUT(req: NextRequest, context) {
  const { nik } = context.params;

  try {
    const body = await req.json();

    if (body.birthDate && isNaN(Date.parse(body.birthDate))) {
      return NextResponse.json(
        { message: "Tanggal lahir tidak valid" },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { nik },
      data: {
        ...body,
        birthDate: new Date(body.birthDate),
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    console.error("PUT /user error:", error);
    return NextResponse.json(
      { message: "NIK Sudah Digunakan" },
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
