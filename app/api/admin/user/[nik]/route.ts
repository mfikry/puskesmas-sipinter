import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// @ts-expect-error: Next.js App Router doesn't support typing context in handler param
export async function PUT(req: NextRequest, context) {
  const { nik } = context.params;
  const body = await req.json();

  const updated = await prisma.user.update({
    where: { nik },
    data: body,
  });

  return NextResponse.json(updated);
}

// @ts-expect-error: Next.js App Router requires untyped context to avoid build issues
export async function DELETE(req: NextRequest, context) {
  const { nik } = context.params;

  await prisma.user.delete({
    where: { nik },
  });

  return NextResponse.json({ message: "User deleted" });
}
