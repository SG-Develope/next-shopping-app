import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

// 미들웨어가 1차 보호하지만, 레이아웃에서 2차로 role을 재확인한다.
// 서버 컴포넌트이므로 Prisma 없이 세션만으로 빠르게 체크 가능하다.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      {/* 관리자 전용 상단 탭 네비게이션 */}
      <div className="border-b mb-8">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-gray-500 mr-4">
            🔧 관리자
          </span>
          <Link
            href="/admin/products"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-colors"
          >
            상품 관리
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-b-2 border-transparent hover:border-gray-300 transition-colors"
          >
            주문 관리
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
