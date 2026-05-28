"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";
import { register } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterInput) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);

    const result = await register(formData);
    if (result?.error) return alert(result.error);

    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
    router.push("/login");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#FF6B58] tracking-tight">
            ShopApp
          </Link>
          <p className="text-sm text-[#907470] mt-2">새 계정을 만들어보세요</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-sm border border-[#F0E4E1] p-8 space-y-5"
        >
          <h1 className="text-xl font-bold text-[#2D1F10]">회원가입</h1>

          <div className="space-y-1">
            <input
              {...formRegister("name")}
              placeholder="이름"
              className="w-full border border-[#F0E4E1] rounded-xl px-4 py-3 text-sm text-[#2D1F10] placeholder:text-[#C4A090] focus:outline-none focus:border-[#FF6B58] transition-colors bg-[#FFF3F8]"
            />
            {errors.name && (
              <p className="text-xs text-[#FF6B58] pl-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              {...formRegister("email")}
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
              {...formRegister("password")}
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
            {isSubmitting ? "처리 중..." : "회원가입"}
          </button>

          <p className="text-center text-sm text-[#907470]">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-[#FF6B58] font-semibold hover:underline">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
