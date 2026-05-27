import { redirect } from "next/navigation";

// /admin 접근 시 상품 관리 페이지로 바로 이동
export default function AdminPage() {
  redirect("/admin/products");
}
