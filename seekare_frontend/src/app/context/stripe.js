import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { config } from "app/config/api.config";

const stripePromise = loadStripe(config.STRIPE_PUBLIC_KEY);

export const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
