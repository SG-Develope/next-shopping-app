"use client";

import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
}

export function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    alert(`"${product.name}" ${quantity}개를 장바구니에 담았습니다.`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full py-3.5 bg-[#FF6B58] text-white rounded-xl hover:bg-[#FF807F] transition-colors font-semibold text-base"
    >
      장바구니 담기
    </button>
  );
}
