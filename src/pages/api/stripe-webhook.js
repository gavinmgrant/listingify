// const getRawBody = require("raw-body");
// const { updateUser, getUser } = require("./_db.js");
// const stripe = require("./_stripe.js");

// // Disable next.js body parsing (stripe needs the raw body to validate the event)
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req, res) => {
//   const headers = req.headers;

//   try {
//     const rawBody = await getRawBody(req);
//     // const { tokens } = await getUser(user.id);

//     const stripeEvent = stripe.webhooks.constructEvent(
//       rawBody,
//       headers["stripe-signature"],
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     console.log(`stripeEvent: ${stripeEvent.type}`);

//     // if (stripeEvent.type === "checkout.session.completed") {
//     //   updateUser(user.id, { tokens: tokens + body.numTokens });
//     // }

//     // Send success response
//     res.send({ status: "success" });
//   } catch (error) {
//     console.log("stripe webhook error", error);

//     // Send error response
//     res.send({ status: "error", code: error.code, message: error.message });
//   }
// };

const getRawBody = require("raw-body");
const { updateCustomerByStripeCid } = require("./_db.js");
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

    // console.log(`stripeEvent: ${stripeEvent.type}`);

    // Get the object from stripeEvent
    const object = stripeEvent.data.object;
    console.log("### stripeEvent.data", stripeEvent.data)

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        const addedTokens = () => {
          let tokens;
          if (object.data.amount === 1000) {
            tokens = 5
          } else if (object.data.amount === 1500) {
            tokens = 10
          } else {
            tokens = 20
          }
          return tokens;
        }

        // Update the current user
        await updateCustomerByStripeCid(object.customer, {
          stripe_subscription_id: subscription.id,
          // Store the Price ID for this subscription
          stripe_price_id: subscription.items.data[0].price.id,
          // Store the subscription status ("active" or "trialing")
          stripe_subscription_status: subscription.status,
          // Store tokens purchased
          tokens: addedTokens(),
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
