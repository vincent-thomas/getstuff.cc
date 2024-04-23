import { Stripe } from "stripe";

export const stripe = new Stripe(env.STRIPE_KEY);
