import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { ReviewList } from "@/components/products/ReviewList";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      _count: { select: { reviews: true } },
    },
  });

  if (!product) {
    notFound();
  }

  const discountRate = (product.name.length % 30) + 10;
  const originalPrice = Math.floor(product.price / (1 - discountRate / 100));

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상품 상단 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 이미지 */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FFF3F1]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[#C4A090] text-sm">
              이미지 없음
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-5 py-2">
          {/* 카테고리 + 상품명 */}
          <div>
            {product.category && (
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-[#FF6B58] uppercase tracking-widest mb-2 block hover:underline"
              >
                {product.category}
              </Link>
            )}
            <h1 className="text-2xl font-bold text-[#2D1F10] leading-snug">
              {product.name}
            </h1>
          </div>

          {/* 평점 미리보기 */}
          {product._count.reviews > 0 && (
            <div className="flex items-center gap-1 text-sm text-[#907470]">
              <span className="text-[#F5A623]">★</span>
              <span>리뷰 {product._count.reviews}개</span>
            </div>
          )}

          {/* 가격 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-[#C4A090]">
              <span>쿠폰적용가</span>
              <span className="line-through">{originalPrice.toLocaleString("ko-KR")}원</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#FF6B58]">{discountRate}%</span>
              <span className="text-3xl font-bold text-[#2D1F10]">
                {product.price.toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>

          {/* 설명 */}
          {product.description && (
            <p className="text-sm text-[#907470] leading-relaxed border-t border-[#F0E4E1] pt-4">
              {product.description}
            </p>
          )}

          {/* 배송 정보 */}
          <div className="bg-[#FFF3F1] rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#907470]">배송</span>
              <span className="font-medium text-[#2D1F10]">
                {product.price >= 30000 ? "무료배송" : "3,000원"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#907470]">재고</span>
              <span className={`font-medium ${product.stock > 0 ? "text-[#2D1F10]" : "text-[#C4A090]"}`}>
                {product.stock > 0 ? `${product.stock}개 남음` : "품절"}
              </span>
            </div>
          </div>

          {/* 수량 선택 + 장바구니 */}
          {product.stock > 0 ? (
            <QuantitySelector product={product} />
          ) : (
            <button
              disabled
              className="w-full py-3.5 bg-[#F0E4E1] text-[#C4A090] rounded-xl cursor-not-allowed font-medium"
            >
              품절된 상품입니다
            </button>
          )}
        </div>
      </div>

      {/* 리뷰 섹션 */}
      <ReviewList productId={product.id} />
    </div>
  );
}
