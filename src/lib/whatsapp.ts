import { APP_CONFIG } from './config';
import { Product, ProductVariant, CartItem } from '../types';
import { calculateProductPrice } from './discount';

export interface SingleProductOrderParams {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  selectedAttributes?: Record<string, string | undefined>;
  customNotes?: string;
}

/**
 * Normalizes Bangladesh phone number to official WhatsApp international format: 8801997049300
 */
export function getCleanWhatsAppPhone(rawPhone: string = APP_CONFIG.whatsAppNumber): string {
  let cleaned = rawPhone.replace(/[^0-9]/g, '');
  // If starts with 01..., prepend 88
  if (cleaned.startsWith('01') && cleaned.length === 11) {
    cleaned = `88${cleaned}`;
  } else if (cleaned.startsWith('8801') && cleaned.length === 13) {
    // already in correct format
  } else if (cleaned.startsWith('880880')) {
    cleaned = cleaned.replace(/^880880/, '880');
  }
  return cleaned;
}

export function generateSingleProductWhatsAppUrl(params: SingleProductOrderParams): string {
  const { product, variant, quantity } = params;
  const pricing = calculateProductPrice(
    variant?.priceOverride || product.price,
    product.oldPrice,
    product.discountType,
    product.discountValue,
    product.salePrice,
    APP_CONFIG.currencySymbol
  );

  const cleanPhone = getCleanWhatsAppPhone(APP_CONFIG.whatsAppInternational);

  let message = `Hello ${APP_CONFIG.storeName},\n\n`;
  message += `I would like to order:\n\n`;
  message += `Product: ${product.name}\n`;

  if (variant) {
    message += `Variant: ${variant.name}\n`;
  }

  message += `Quantity: ${quantity}\n`;
  message += `Price: ${pricing.formattedFinal}\n\n`;
  message += `Please confirm availability and ordering details.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateCartWhatsAppUrl(
  items: CartItem[],
  customerInfo?: { name?: string; address?: string; phone?: string; notes?: string }
): string {
  const cleanPhone = getCleanWhatsAppPhone(APP_CONFIG.whatsAppInternational);
  let subtotal = 0;

  let message = `Hello ${APP_CONFIG.storeName},\n\n`;
  message += `I would like to order:\n\n`;

  items.forEach((item, idx) => {
    subtotal += item.totalPrice;
    message += `${idx + 1}. Product: ${item.product.name}\n`;
    if (item.variant) {
      message += `   Variant: ${item.variant.name}\n`;
    }
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${APP_CONFIG.currencySymbol}${item.unitPrice.toLocaleString()}\n\n`;
  });

  message += `Estimated Subtotal: ${APP_CONFIG.currencySymbol}${subtotal.toLocaleString()}\n\n`;

  if (customerInfo) {
    if (customerInfo.name) message += `Customer Name: ${customerInfo.name}\n`;
    if (customerInfo.phone) message += `Phone: ${customerInfo.phone}\n`;
    if (customerInfo.address) message += `Delivery Address: ${customerInfo.address}\n`;
    if (customerInfo.notes) message += `Note: ${customerInfo.notes}\n`;
    message += `\n`;
  }

  message += `Please confirm availability and ordering details.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
