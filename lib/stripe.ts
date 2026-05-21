import Stripe from "stripe";

export function createStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
  });
}
