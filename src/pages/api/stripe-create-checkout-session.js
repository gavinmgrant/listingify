const requireAuth = require("./_require-auth.js");
const { getUser, getCustomer, createCustomer } = require("./_db.js");
const stripe = require("./_stripe.js");

export default requireAuth(async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.priceId) {
    return res.status(400).send({
      status: "error",
      message: "No priceId is defined in request body",
    });
  }

  try {
    const { email } = await getUser(user?.id);
    let { stripeCustomerId } = (await getCustomer(user?.id)) || {};

    // If user is not a customer then create a customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: email });

      await createCustomer(user.id, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
    });

    // Return success response
    res.send({ status: "success", data: session });
  } catch (error) {
    console.log("stripe-create-checkout-session error", error);

    // Return error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
});
