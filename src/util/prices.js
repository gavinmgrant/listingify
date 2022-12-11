const stripePriceIds = {
  "5": process.env.NEXT_PUBLIC_STRIPE_PRICE_5,
  "10": process.env.NEXT_PUBLIC_STRIPE_PRICE_10,
  "20": process.env.NEXT_PUBLIC_STRIPE_PRICE_20,
};

// Get Stripe priceId
export function getStripePriceId(planId) {
  return stripePriceIds[planId];
}

// Get friendly plan ID ("basic", "premium", etc) by Stripe plan ID
// Used in auth.js to include planId in the user object
export function getFriendlyPlanId(stripePriceId) {
  const id = Object.keys(stripePriceIds).find(
    (key) => stripePriceIds[key] === stripePriceId
  )
  return id;
}
