import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { nik: string } }) {
  const body = await req.json();

  const updated = await prisma.user.update({
    where: { nik: params.nik },
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
