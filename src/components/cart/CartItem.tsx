"use client";

import Image from "next/image";
import { useCartStore, CartItem as CartItemType } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-5 border-b border-[#F0E4E1]">
      {/* 상품 이미지 */}
      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#FFF3F1]">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-[#C4A090]">
            없음
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[#2D1F10] text-sm line-clamp-2 mb-1">
          {item.name}
        </p>
        <p className="text-[#FF6B58] font-bold text-sm">
          {item.price.toLocaleString("ko-KR")}원
        </p>

        {/* 수량 조절 */}
        <div className="flex items-center gap-2 mt-2.5">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-full border border-[#F0E4E1] flex items-center justify-center text-sm text-[#907470] hover:border-[#FF6B58] hover:text-[#FF6B58] transition-colors"
          >
            −
          </button>
          <span className="text-sm font-semibold text-[#2D1F10] w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-full border border-[#F0E4E1] flex items-center justify-center text-sm text-[#907470] hover:border-[#FF6B58] hover:text-[#FF6B58] transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* 소계 + 삭제 */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.id)}
          className="text-[#C4A090] hover:text-[#FF6B58] text-lg leading-none transition-colors"
          aria-label="삭제"
        >
          ✕
        </button>
        <p className="text-sm font-bold text-[#2D1F10]">
          {(item.price * item.quantity).toLocaleString("ko-KR")}원
        </p>
      </div>
    </div>
  );
}
