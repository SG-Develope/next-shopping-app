import { prisma } from "@/lib/db";
import { ProductGrid } from "@/components/products/ProductGrid";
import Link from "next/link";
import Image from "next/image";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;

  const [products, categoryImageRows, allCategoryRows] = await Promise.all([
    prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      select: { category: true, imageUrl: true },
      where: { category: { not: null }, imageUrl: { not: null } },
      distinct: ["category"],
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
      where: { category: { not: null } },
    }),
  ]);

  const categoryList = allCategoryRows
    .map((p) => p.category)
    .filter(Boolean) as string[];

  const categoryImageMap = Object.fromEntries(
    categoryImageRows.map((r) => [r.category!, r.imageUrl!])
  );

  return (
    <div>
      {/* 카테고리 이미지 슬라이더 */}
      <div
        className="flex gap-4 overflow-x-auto pb-2 mb-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* 전체 카드 */}
        <Link href="/products" className="shrink-0 group flex flex-col items-center">
          <div
            className={`relative w-22 h-22 rounded-2xl overflow-hidden transition-all duration-200 ${
              !category
                ? "ring-2 ring-[#FF6B58] ring-offset-2"
                : "group-hover:ring-2 group-hover:ring-[#FFE3E5] group-hover:ring-offset-2"
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#FFE3E5] via-[#FF807F] to-[#FF6B58]" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl select-none">
              🛍️
            </div>
          </div>
          <span
            className={`mt-2 text-xs font-semibold tracking-tight ${
              !category ? "text-[#FF6B58]" : "text-[#907470] group-hover:text-[#FF6B58]"
            } transition-colors`}
          >
            전체
          </span>
        </Link>

        {/* 카테고리별 이미지 카드 */}
        {categoryList.map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${encodeURIComponent(cat)}`}
            className="shrink-0 group flex flex-col items-center"
          >
            <div
              className={`relative w-22 h-22 rounded-2xl overflow-hidden transition-all duration-200 ${
                category === cat
                  ? "ring-2 ring-[#FF6B58] ring-offset-2"
                  : "group-hover:ring-2 group-hover:ring-[#FFE3E5] group-hover:ring-offset-2"
              }`}
            >
              {categoryImageMap[cat] ? (
                <>
                  <Image
                    src={categoryImageMap[cat]}
                    alt={cat}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="88px"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      category === cat ? "bg-[#FF6B58]/20" : "bg-black/10 group-hover:bg-[#FF6B58]/15"
                    }`}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-[#FFF3F1] to-[#FFE3E5]" />
              )}
            </div>
            <span
              className={`mt-2 text-xs font-semibold tracking-tight ${
                category === cat
                  ? "text-[#FF6B58]"
                  : "text-[#907470] group-hover:text-[#FF6B58]"
              } transition-colors`}
            >
              {cat}
            </span>
          </Link>
        ))}
      </div>

      {/* 섹션 타이틀 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#2D1F10]">
          {category ?? "전체 상품"}
        </h1>
        <span className="text-sm text-[#C4A090]">{products.length}개</span>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
