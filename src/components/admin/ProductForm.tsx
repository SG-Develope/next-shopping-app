"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { queryKeys } from "@/lib/queryKeys";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// API 호출 함수
async function createProduct(data: ProductFormData) {
  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? "상품 등록에 실패했습니다");
  }

  return response.json();
}

export function ProductForm({ open, onOpenChange }: ProductFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      // number 필드 기본값은 undefined로 두면 빈 input 상태가 자연스럽다
      price: undefined,
      stock: undefined,
      category: "",
      imageUrl: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // 상품 목록 캐시 무효화 → 자동으로 최신 목록 다시 조회
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.products });
      reset();
      onOpenChange(false);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    mutate(data);
  };

  // 모달 닫힐 때 폼 초기화
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* 상품명 */}
          <div className="space-y-1">
            <Label htmlFor="name">
              상품명 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="상품명을 입력하세요"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* 설명 */}
          <div className="space-y-1">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="상품 설명을 입력하세요 (선택)"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* 가격 / 재고 (2열) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="price">
                가격 (원) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min={1}
                placeholder="10000"
                // valueAsNumber: HTML input 값을 string → number로 자동 변환
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="stock">
                재고 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                min={0}
                placeholder="100"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* 카테고리 */}
          <div className="space-y-1">
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              placeholder="예: 의류, 전자기기 (선택)"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* 이미지 URL */}
          <div className="space-y-1">
            <Label htmlFor="imageUrl">이미지 URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg (선택)"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <p className="text-xs text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "등록 중..." : "상품 등록"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
