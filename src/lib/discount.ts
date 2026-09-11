/**
 * Nuqtah Mathematical Discount Engine
 * Evaluates, computes, and formats exact pricing and discount percentages.
 */

export interface PriceCalculation {
  originalPrice: number;
  finalPrice: number;
  savings: number;
  discountPercentage: number;
  hasDiscount: boolean;
  formattedOriginal: string;
  formattedFinal: string;
  formattedSavings: string;
  badgeLabel?: string;
}

export function calculateProductPrice(
  price: number,
  oldPrice?: number,
  discountType?: 'percentage' | 'fixed' | 'sale_price',
  discountValue?: number,
  salePrice?: number,
  currencySymbol: string = '৳'
): PriceCalculation {
  const originalPrice = Math.max(0, oldPrice && oldPrice > price ? oldPrice : price);
  let finalPrice = price;

  if (salePrice && salePrice > 0 && salePrice < originalPrice) {
    finalPrice = salePrice;
  } else if (discountType === 'percentage' && discountValue && discountValue > 0) {
    const calculated = originalPrice * (1 - discountValue / 100);
    finalPrice = Math.max(0, Math.round(calculated));
  } else if (discountType === 'fixed' && discountValue && discountValue > 0) {
    finalPrice = Math.max(0, originalPrice - discountValue);
  } else if (oldPrice && oldPrice > price) {
    finalPrice = price;
  }

  const savings = Math.max(0, originalPrice - finalPrice);
  const discountPercentage = originalPrice > 0 && savings > 0
    ? Math.round((savings / originalPrice) * 100)
    : 0;
  const hasDiscount = savings > 0 && discountPercentage > 0;

  return {
    originalPrice,
    finalPrice,
    savings,
    discountPercentage,
    hasDiscount,
    formattedOriginal: `${currencySymbol}${originalPrice.toLocaleString()}`,
    formattedFinal: `${currencySymbol}${finalPrice.toLocaleString()}`,
    formattedSavings: `${currencySymbol}${savings.toLocaleString()}`,
    badgeLabel: hasDiscount ? `${discountPercentage}% OFF` : undefined,
  };
}

export function formatPrice(amount: number, currencySymbol: string = '৳'): string {
  return `${currencySymbol}${Math.round(amount).toLocaleString()}`;
}
