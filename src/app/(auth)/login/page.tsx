"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error)
      return alert("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#FF6B58] tracking-tight">
            ShopApp
          </Link>
          <p className="text-sm text-[#907470] mt-2">따뜻한 쇼핑을 시작하세요</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm border border-[#F0E4E1] p-8 space-y-5"
        >
          <h1 className="text-xl font-bold text-[#2D1F10]">로그인</h1>

          <div className="space-y-1">
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              className="w-full border border-[#F0E4E1] rounded-xl px-4 py-3 text-sm text-[#2D1F10] placeholder:text-[#C4A090] focus:outline-none focus:border-[#FF6B58] transition-colors bg-[#FFF3F8]"
            />
            {errors.email && (
              <p className="text-xs text-[#FF6B58] pl-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...register("password")}
              type="password"
              placeholder="비밀번호"
              className="w-full border border-[#F0E4E1] rounded-xl px-4 py-3 text-sm text-[#2D1F10] placeholder:text-[#C4A090] focus:outline-none focus:border-[#FF6B58] transition-colors bg-[#FFF3F8]"
            />
            {errors.password && (
              <p className="text-xs text-[#FF6B58] pl-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF6B58] text-white py-3 rounded-xl font-semibold hover:bg-[#FF807F] transition-colors disabled:opacity-50 text-sm"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <p className="text-center text-sm text-[#907470]">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-[#FF6B58] font-semibold hover:underline">
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
