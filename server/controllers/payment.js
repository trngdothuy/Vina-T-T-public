const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// 3. To create a payment session in Stripe 
const create_checkout_session = async (req, res) => {
  try {
    debugger
    // 4. getting products from the body
    let { cart } = req.body;
    if (cart.length < 1 || !cart)
      return res.send({
        ok: false,
        message: "Please select at least 1 product",
      });
    // 5. preparing products for Stripe by adding currency and multiplying prices by 100 
    cart = cart.map((item) => (
        {
          price_data: {
            currency: process.env.CURRENCY,
            unit_amount: item.price * 100,
            product_data: {
              name: item.name,
              description: item.name,
              images: [item.photo],
            }
          },
          quantity:item.quantity
        }
        ))
    console.log(cart)
    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [payment_intent_data] - lets capture the payment later
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create

    // 6. Actually making a session with Stripe 
    session = await stripe.checkout.sessions.create({
      payment_method_types: process.env.PAYMENT_METHODS.split(", "),
      line_items: cart,
      mode:'payment',
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param

      // 7. If payment would be successful this would be url of redirect in the client to which we will be  passing the id of the session which is a way to retrieve info about the order/payment 
      success_url: `${process.env.DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/`,
    });
    // 8. If session created  successful we send back ok and session id to the client 
    return res.send({ ok: true, sessionId: session.id });
  } catch (error) {
    console.log("ERROR =====>", error);
    return res.send({ ok: false, message: error});
  }
};

// 14. Controller triggers by the incoming req with session id
const checkout_session = async (req, res) => {
  try {
    debugger
    const { sessionId } = req.query;
    // 15. We execute request to Stripe to get data for the specific session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId, {expand: ['line_items']});
    // 16. From the session received above we get customer info
    // const customer = await stripe.customers.retrieve(session.customer);
    // 17. And sending both session and customer to the client 
    return res.send({ ok: true, session });
  } catch (error) {
    console.log("ERROR =====>", error);
    return res.send({ ok: false, message: error });
  }
};

module.exports = {
  create_checkout_session,
  checkout_session,
};
