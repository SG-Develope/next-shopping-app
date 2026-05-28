"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-5">🛒</p>
        <p className="text-lg text-[#907470] mb-2">장바구니가 비어 있습니다</p>
        <p className="text-sm text-[#C4A090] mb-8">원하는 상품을 담아보세요!</p>
        <Link
          href="/products"
          className="inline-block bg-[#FF6B58] text-white px-8 py-3 rounded-full hover:bg-[#FF807F] transition-colors font-semibold"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2D1F10] mb-8">장바구니</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
