"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-[#C4A090] hover:text-[#FF6B58] transition-colors font-medium"
    >
      로그아웃
    </button>
  );
}
