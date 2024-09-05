import { Keys } from "config/keys";
import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import asyncHandler from "utils/asyncHandler";

const stripe = new Stripe(Keys.stripe.secretKey);

export const payment = asyncHandler(async (req: Request, res: Response) => {
  const params = {};

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_options: [
      {shipping_rate: 'shr_1PYWYWSEKEZzVm5scyj75lt1'},
      {shipping_rate: 'shr_1PYWZXSEKEZzVm5sSTn0XtES'}
    ],
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });
  res.redirect(303, session.url);
});
