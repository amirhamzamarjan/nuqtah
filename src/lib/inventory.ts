import { Product, ProductVariant } from '../types';

export type InventoryState = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface InventoryStatus {
  state: InventoryState;
  label: string;
  isAvailable: boolean;
  availableQuantity: number;
  isLowStock: boolean;
}

export function evaluateInventoryStatus(
  stock: number,
  lowStockThreshold: number = 3
): InventoryStatus {
  const safeStock = Math.max(0, stock || 0);

  if (safeStock <= 0) {
    return {
      state: 'OUT_OF_STOCK',
      label: 'Out of Stock',
      isAvailable: false,
      availableQuantity: 0,
      isLowStock: false,
    };
  }

  if (safeStock <= lowStockThreshold) {
    return {
      state: 'LOW_STOCK',
      label: `Low Stock (${safeStock} left)`,
      isAvailable: true,
      availableQuantity: safeStock,
      isLowStock: true,
    };
  }

  return {
    state: 'IN_STOCK',
    label: 'In Stock',
    isAvailable: true,
    availableQuantity: safeStock,
    isLowStock: false,
  };
}

export function getProductEffectiveStock(
  product: Product,
  selectedVariantId?: string
): number {
  if (selectedVariantId && product.variants && product.variants.length > 0) {
    const variant = product.variants.find((v) => v.id === selectedVariantId);
    return variant ? Math.max(0, variant.stock) : 0;
  }

  if (product.variants && product.variants.length > 0) {
    return product.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);
  }

  return Math.max(0, product.totalStock || 0);
}
