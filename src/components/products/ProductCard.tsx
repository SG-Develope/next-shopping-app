import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
}

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const discountRate = (product.name.length % 30) + 10;
  const originalPrice = Math.floor(product.price / (1 - discountRate / 100));
  const isFreeShipping = product.price >= 30000;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="flex flex-col gap-3">
        {/* 이미지 */}
        <div className="relative aspect-square bg-[#FFF3F1] rounded-xl overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-[#C4A090] text-sm">
              이미지 없음
            </div>
          )}
          {/* 할인 뱃지 */}
          <span className="absolute top-2 left-2 bg-[#FF6B58] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discountRate}% OFF
          </span>
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-[#2D1F10] text-sm md:text-base line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-[#C4A090]">쿠폰적용가</span>
            <span className="text-xs text-[#C4A090] line-through">
              {originalPrice.toLocaleString("ko-KR")}원
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FF6B58] text-lg">
              {discountRate}%
            </span>
            <span className="font-bold text-[#2D1F10] text-lg">
              {product.price.toLocaleString("ko-KR")}원
            </span>
          </div>

          <span className="text-xs text-[#907470] mt-1">
            {isFreeShipping ? "무료배송" : "배송비 3,000원"}
          </span>

          {isFreeShipping && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-[10px] bg-[#FF6B58] text-white px-1.5 py-0.5 rounded-full font-bold">
                빠른배송
              </span>
              <span className="text-[11px] text-[#907470] font-medium">
                내일 도착 보장
              </span>
            </div>
          )}

          {product.stock === 0 && (
            <span className="text-xs text-[#C4A090] mt-1 block font-bold">
              품절된 상품입니다
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
