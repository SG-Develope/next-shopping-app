import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">🛍️ ShopApp</h1>
      <p className="text-lg text-gray-500 mb-8">다양한 상품을 만나보세요</p>
      <Link
        href="/products"
        className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-700 transition-colors"
      >
        쇼핑 시작하기
      </Link>
    </div>
  );
}
