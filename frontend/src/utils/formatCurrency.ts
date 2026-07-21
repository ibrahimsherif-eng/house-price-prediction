/**
 * utils/formatCurrency.ts
 * -------------------------
 * Formats a predicted price (in rupees) for display. The dataset the
 * model was trained on prices properties in Lac (100,000) and Cr
 * (10,000,000), so a secondary Lac/Cr readout is shown alongside the
 * standard currency figure.
 */

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatRupees(amount: number): string {
  return rupeeFormatter.format(amount);
}

/** Converts a rupee amount into the Lac/Cr shorthand used in Indian real estate. */
export function formatLacCrore(amount: number): string {
  if (amount >= 1e7) {
    return `${(amount / 1e7).toFixed(2)} Cr`;
  }
  if (amount >= 1e5) {
    return `${(amount / 1e5).toFixed(2)} Lac`;
  }
  return rupeeFormatter.format(amount);
}
