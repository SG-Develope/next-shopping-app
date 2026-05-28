"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export function CartSummary() {
  const totalPrice = useCartStore((state) => state.totalPrice());
  const items = useCartStore((state) => state.items);

  if (items.length === 0) return null;

  const shippingFee = totalPrice >= 50000 ? 0 : 3000;
  const finalPrice = totalPrice + shippingFee;

  return (
    <div className="bg-[#FFF3F8] rounded-2xl p-6 sticky top-28">
      <h2 className="font-bold text-[#2D1F10] text-lg mb-5">결제 금액</h2>

      <div className="space-y-3 mb-4 text-sm">
        <div className="flex justify-between text-[#907470]">
          <span>상품 금액</span>
          <span>{totalPrice.toLocaleString("ko-KR")}원</span>
        </div>
        <div className="flex justify-between text-[#907470]">
          <span>배송비</span>
          <span>{shippingFee === 0 ? "무료" : "3,000원"}</span>
        </div>
      </div>

      <div className="border-t border-[#F0E4E1] pt-4 mb-2">
        <div className="flex justify-between font-bold text-lg text-[#2D1F10]">
          <span>총 결제금액</span>
          <span className="text-[#FF6B58]">{finalPrice.toLocaleString("ko-KR")}원</span>
        </div>
      </div>

      {totalPrice < 50000 && (
        <p className="text-xs text-[#C4A090] mb-5">
          {(50000 - totalPrice).toLocaleString("ko-KR")}원 더 담으면 무료 배송!
        </p>
      )}

      <Link
        href="/checkout"
        className="block w-full text-center py-3.5 bg-[#FF6B58] text-white rounded-xl hover:bg-[#FF807F] transition-colors font-semibold mt-4"
      >
        주문하기
      </Link>
    </div>
  );
}
