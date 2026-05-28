"use client";

import { useState, useTransition } from "react";
import { createReview } from "@/actions/review.actions";

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("별점을 선택해 주세요.");
      return;
    }
    if (!content.trim()) {
      setError("리뷰 내용을 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      try {
        await createReview(productId, rating, content);
        setRating(0);
        setContent("");
      } catch {
        setError("리뷰 등록에 실패했습니다. 다시 시도해 주세요.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 별점 선택 */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-3xl transition-transform hover:scale-110 leading-none"
          >
            <span
              className={
                star <= (hovered || rating) ? "text-[#F5A623]" : "text-[#F0E4E1]"
              }
            >
              ★
            </span>
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-[#907470]">
            {["", "별로예요", "그저 그래요", "괜찮아요", "좋아요", "최고예요"][rating]}
          </span>
        )}
      </div>

      {/* 텍스트 입력 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이 상품에 대한 솔직한 리뷰를 남겨주세요."
        rows={4}
        className="w-full px-4 py-3 border border-[#F0E4E1] rounded-xl text-sm text-[#2D1F10] placeholder:text-[#C4A090] focus:outline-none focus:border-[#FF6B58] resize-none bg-white transition-colors"
      />

      {error && <p className="text-sm text-[#FF6B58]">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-[#FF6B58] text-white text-sm font-semibold rounded-xl hover:bg-[#FF807F] transition-colors disabled:opacity-50"
      >
        {isPending ? "등록 중..." : "리뷰 등록"}
      </button>
    </form>
  );
}
