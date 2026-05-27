"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductForm } from "@/components/admin/ProductForm";
import { queryKeys } from "@/lib/queryKeys";
import { PlusIcon } from "lucide-react";

// 상품 타입 (Prisma Product 구조와 동일)
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string | null;
  imageUrl: string | null;
  createdAt: string;
}

async function fetchAdminProducts(): Promise<Product[]> {
  const response = await fetch("/api/admin/products");
  if (!response.ok) throw new Error("상품 목록을 불러오지 못했습니다");
  return response.json();
}

export default function AdminProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: queryKeys.admin.products,
    queryFn: fetchAdminProducts,
  });

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" />
          상품 등록
        </Button>
      </div>

      {/* 상품 등록 모달 */}
      <ProductForm open={isFormOpen} onOpenChange={setIsFormOpen} />

      {/* 로딩 */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* 에러 */}
      {isError && (
        <div className="text-center py-16 text-red-500">
          상품 목록을 불러오지 못했습니다.
        </div>
      )}

      {/* 상품 목록 테이블 */}
      {!isLoading && !isError && (
        <>
          {products && products.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">
                      상품명
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">
                      카테고리
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">
                      가격
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-gray-600">
                      재고
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">
                      등록일
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {product.category ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {product.price.toLocaleString()}원
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={
                            product.stock === 0
                              ? "text-red-500 font-medium"
                              : "text-gray-900"
                          }
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📦</p>
              <p>등록된 상품이 없습니다</p>
              <p className="text-sm mt-1">상품 등록 버튼으로 첫 상품을 추가해보세요</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
