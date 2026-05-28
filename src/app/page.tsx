import { prisma } from "@/lib/db";
import { ProductGrid } from "@/components/products/ProductGrid";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* 히어로 배너 */}
      <section
        className="rounded-2xl mb-10 px-8 py-14 flex flex-col items-center text-center"
        style={{
          background:
            "linear-gradient(135deg, #FFF3F8 0%, #FFE3E5 50%, #FFF3F1 100%)",
        }}
      >
        <span className="text-xs font-semibold tracking-widest text-[#FF6B58] uppercase mb-3">
          Spring Collection 2025
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D1F10] mb-4 leading-tight">
          따뜻한 봄처럼,
          <br />
          설레는 쇼핑
        </h1>
        <p className="text-[#907470] mb-8 text-base max-w-md">
          새 시즌을 맞아 엄선한 봄 컬렉션을 만나보세요.
          <br />
          지금 구매하면 무료배송 혜택까지!
        </p>
        <Link
          href="/products"
          className="bg-[#FF6B58] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#FF807F] transition-colors"
        >
          전체 상품 보기
        </Link>
      </section>

      {/* 상품 리스트 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#2D1F10]">신상품</h2>
          <Link
            href="/products"
            className="text-sm text-[#907470] hover:text-[#FF6B58] transition-colors"
          >
            전체보기 →
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
