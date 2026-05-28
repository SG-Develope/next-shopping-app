import Link from "next/link";
import { prisma } from "@/lib/db";

const FIXED_LINKS = [
  { label: "신상품", href: "/products" },
  { label: "베스트", href: "/products" },
  { label: "기획전", href: "/products" },
  { label: "세일", href: "/products" },
  { label: "무료배송", href: "/products" },
];

export async function QuickNav() {
  const rows = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    where: { category: { not: null } },
  });

  const categories = rows
    .map((r) => r.category)
    .filter(Boolean) as string[];

  const links = [
    ...FIXED_LINKS.slice(0, 2),
    ...categories.map((cat) => ({
      label: cat,
      href: `/products?category=${encodeURIComponent(cat)}`,
    })),
    ...FIXED_LINKS.slice(2),
  ];

  return (
    <div className="bg-white border-b border-[#F0E4E1]">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex gap-7 overflow-x-auto py-2.5"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {links.map((link) => (
            <Link
              key={link.label + link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-[#907470] hover:text-[#FF6B58] transition-colors flex-shrink-0 pb-0.5 border-b-2 border-transparent hover:border-[#FF6B58]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
