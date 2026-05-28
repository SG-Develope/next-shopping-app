import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ReviewForm } from "./ReviewForm";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "text-2xl" : "text-base";
  return (
    <span className={cls}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-[#F5A623]" : "text-[#F0E4E1]"}>
          ★
        </span>
      ))}
    </span>
  );
}

export async function ReviewList({ productId }: { productId: string }) {
  const [reviews, session] = await Promise.all([
    prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    auth(),
  ]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-14">
      <div className="border-t border-[#F0E4E1] pt-10">
        {/* 평점 요약 */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-lg font-bold text-[#2D1F10]">상품 리뷰</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className="text-sm font-semibold text-[#2D1F10]">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-sm text-[#C4A090]">({reviews.length}개)</span>
            </div>
          )}
        </div>

        {/* 리뷰 작성 */}
        <div className="bg-[#FFF3F8] rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-[#2D1F10] mb-4">리뷰 작성</h3>
          {session ? (
            <ReviewForm productId={productId} />
          ) : (
            <p className="text-sm text-[#907470]">
              리뷰를 작성하려면{" "}
              <a href="/login" className="text-[#FF6B58] font-medium underline">
                로그인
              </a>
              이 필요합니다.
            </p>
          )}
        </div>

        {/* 리뷰 목록 */}
        {reviews.length === 0 ? (
          <p className="text-sm text-[#C4A090] text-center py-8">
            아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요!
          </p>
        ) : (
          <ul className="space-y-5">
            {reviews.map((review) => (
              <li key={review.id} className="bg-white rounded-2xl p-5 border border-[#F0E4E1]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#2D1F10]">
                      {review.user.name}
                    </span>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-xs text-[#C4A090]">
                    {new Date(review.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-sm text-[#503F3A] leading-relaxed">{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
