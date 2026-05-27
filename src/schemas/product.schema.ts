import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "상품명은 2자 이상 입력해주세요")
    .max(100, "상품명은 100자 이하로 입력해주세요"),
  description: z
    .string()
    .max(500, "설명은 500자 이하로 입력해주세요")
    .optional(),
  // HTML <input type="number"> 는 빈 값이 NaN으로 넘어오므로 NaN 방어 추가
  price: z
    .number({ error: "가격을 숫자로 입력해주세요" })
    .int("가격은 정수로 입력해주세요")
    .positive("가격은 0보다 커야 합니다"),
  stock: z
    .number({ error: "재고를 숫자로 입력해주세요" })
    .int("재고는 정수로 입력해주세요")
    .min(0, "재고는 0 이상이어야 합니다"),
  category: z
    .string()
    .max(50, "카테고리는 50자 이하로 입력해주세요")
    .optional(),
  imageUrl: z
    .string()
    .url("올바른 URL 형식이 아닙니다")
    .optional()
    .or(z.literal("")), // 빈 문자열도 허용 (선택 필드)
});

export type ProductFormData = z.infer<typeof productSchema>;
