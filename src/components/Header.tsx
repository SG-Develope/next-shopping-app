import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";
import { CartBadge } from "./CartBadge";
import { QuickNav } from "./QuickNav";

export async function Header() {
  const session = await auth();

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-white border-b border-[#F0E4E1]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="text-xl font-bold text-[#FF6B58] tracking-tight shrink-0"
          >
            ShopApp
          </Link>

          {/* 우측 전체 네비게이션 */}
          <nav className="flex items-center gap-5">
            <Link
              href="/products"
              className="text-sm text-[#907470] hover:text-[#FF6B58] font-medium transition-colors"
            >
              상품목록
            </Link>

            <CartBadge userId={session?.user?.id} />

            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm text-[#FF6B58] hover:text-[#FF807F] font-semibold transition-colors"
              >
                관리자
              </Link>
            )}

            {/* 구분선 */}
            <div className="h-4 w-px bg-[#F0E4E1]" />

            {session ? (
              <>
                <span className="text-sm text-[#907470] font-medium">
                  {session.user?.name}
                </span>
                <Link
                  href="/mypage"
                  className="text-sm text-[#907470] hover:text-[#FF6B58] transition-colors"
                >
                  마이페이지
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-[#907470] hover:text-[#FF6B58] transition-colors font-medium"
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  className="text-sm bg-[#FF6B58] text-white px-4 py-2 rounded-full hover:bg-[#FF807F] transition-colors font-medium"
                >
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <QuickNav />
    </div>
  );
}
