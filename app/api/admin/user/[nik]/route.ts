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

export async function DELETE(_: NextRequest, { params }: { params: { nik: string } }) {
  const deleted = await prisma.user.delete({
    where: { nik: params.nik },
  });

  return NextResponse.json({ message: "User deleted", deleted });
}
