"use client";

import { useState } from "react";
import { AddToCartButton } from "./AddToCartButton";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export function QuantitySelector({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(product.stock, q + 1));

  return (
    <div className="space-y-4">
      {/* 수량 선택 */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-[#2D1F10]">수량</span>
        <div className="flex items-center border border-[#F0E4E1] rounded-xl overflow-hidden">
          <button
            onClick={decrease}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-[#907470] hover:bg-[#FFF3F1] disabled:opacity-30 transition-colors text-lg font-bold"
          >
            −
          </button>
          <span className="w-12 text-center text-sm font-semibold text-[#2D1F10]">
            {quantity}
          </span>
          <button
            onClick={increase}
            disabled={quantity >= product.stock}
            className="w-10 h-10 flex items-center justify-center text-[#907470] hover:bg-[#FFF3F1] disabled:opacity-30 transition-colors text-lg font-bold"
          >
            +
          </button>
        </div>
        <span className="text-xs text-[#C4A090]">최대 {product.stock}개</span>
      </div>

      {/* 총 금액 */}
      <div className="flex items-center justify-between py-3 border-t border-b border-[#F0E4E1]">
        <span className="text-sm text-[#907470]">총 상품금액</span>
        <span className="text-xl font-bold text-[#FF6B58]">
          {(product.price * quantity).toLocaleString("ko-KR")}원
        </span>
      </div>

      <AddToCartButton product={product} quantity={quantity} />
    </div>
  );
}
