const getRawBody = require("raw-body");
const {
  updateCustomerByStripeCid,
  getCustomerByStripeCid,
} = require("./_db.js");
const stripe = require("./_stripe.js");

// Disable next.js body parsing (stripe needs the raw body to validate the event)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const headers = req.headers;

  try {
    const rawBody = await getRawBody(req);

    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Get the object from stripeEvent
    const object = stripeEvent.data.object;

    if (stripeEvent.type === "checkout.session.completed") {
      // Get the customer object
      const cust = await getCustomerByStripeCid(object.customer);

      // Get the number of tokens puchased based on price
      let addedTokens = 0;
      if (object.amount_total === 1000) {
        addedTokens = 5;
      } else if (object.amount_total === 1500) {
        addedTokens = 10;
      } else if (object.amount_total === 2000) {
        addedTokens = 20;
      }

      // Update tokens amount for the current customer
      await updateCustomerByStripeCid(object.customer, {
        tokens: cust.tokens + addedTokens,
      });
    }

    // Send success response
    res.send({ status: "success" });
  } catch (error) {
    console.log("stripe webhook error", error);

    // Send error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
};
