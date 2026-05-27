/**
 * TanStack Query 캐시 키 중앙 관리
 *
 * 컴포넌트에 키 문자열을 직접 쓰면 오타로 invalidateQueries가 동작하지 않는 버그가 생긴다.
 * 이 파일에서 한 곳에서 관리하면 타입 안전하게 사용할 수 있다.
 */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    detail: (id: string) => ["products", id] as const,
  },
  orders: {
    byUser: (userId: string) => ["orders", userId] as const,
    all: ["orders"] as const,
  },
  admin: {
    products: ["admin", "products"] as const,
    orders: ["admin", "orders"] as const,
  },
} as const;
