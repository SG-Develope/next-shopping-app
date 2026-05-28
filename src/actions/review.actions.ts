"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createReview(
  productId: string,
  rating: number,
  content: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("별점은 1~5 사이여야 합니다.");
  }
  if (!content.trim()) {
    throw new Error("리뷰 내용을 입력해 주세요.");
  }

  await prisma.review.create({
    data: {
      userId: session.user.id,
      productId,
      rating,
      content: content.trim(),
    },
  });

  revalidatePath(`/products/${productId}`);
}
