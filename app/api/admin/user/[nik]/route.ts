import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  // ubah TIDAK menggunakan destructuring langsung
  context: { params: Record<string, string> }
) {
  const nik = context.params.nik;
  const body = await req.json();

  const updated = await prisma.user.update({
    where: { nik },
    data: body,
  });

  return NextResponse.json(updated);
}
export async function DELETE(_: NextRequest, { params }: { params: { nik: string } }) {
  const deleted = await prisma.user.delete({
    where: { nik: params.nik },
  });

  return NextResponse.json({ message: "User deleted", deleted });
}
