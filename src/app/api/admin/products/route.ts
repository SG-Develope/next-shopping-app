import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { productSchema } from "@/schemas/product.schema";

// ── 관리자 권한 체크 공통 함수 ─────────────────────────────────
async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 }) };
  }
  if ((session.user as any).role !== "admin") {
    return { error: NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 }) };
  }
  return { session };
}

// ── GET: 전체 상품 목록 조회 (관리자용) ──────────────────────────
export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// ── POST: 신규 상품 등록 ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();

  // Zod 유효성 검사
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "입력값이 올바르지 않습니다", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, description, price, stock, category, imageUrl } = parsed.data;

  const product = await prisma.product.create({
    data: {
      name,
      description: description ?? null,
      price,
      stock,
      category: category ?? null,
      // 빈 문자열은 null로 저장
      imageUrl: imageUrl === "" ? null : (imageUrl ?? null),
    },
  });

  return NextResponse.json(product, { status: 201 });
}
