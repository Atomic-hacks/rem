/**
 * Property utilities and formatting functions
 */

/**
 * Format currency amount as Nigerian Naira
 */
export const formatCurrency = (amount: number): string =>
  `₦${amount.toLocaleString()}`;

/**
 * Format price with period/duration suffix
 */
export const formatPrice = (amount: number, period?: string): string => {
  const formatted = formatCurrency(amount);
  return period ? `${formatted}/${period}` : formatted;
};
