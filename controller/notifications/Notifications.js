import sgMail from "@sendgrid/mail";
import OrderConfirmationTemplate from "./templates/OrderConfirmationTemplate.js";
sgMail.setApiKey(
  "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"
);
const defaults = {
  from: {
    name: "Sadibazar",
    email: "orders@sadibizar.tech",
  },
};

export const orderConfirmation = async (req, res) => {
  const { to, order } = req.body;

  const email = {
    ...defaults,
    to,
    subject: "Order Confirmation",
    text: `Your order #${order.order_id} has been placed successfully. ${order.products.length} items will be sent to ${order.address} by ${order.ordered_at}. Your grand total is ${order.total}`,
    html: OrderConfirmationTemplate(order),
  };

  await sendEmail(email, res);
};

const sendEmail = async (email, res) => {
  try {
    await sgMail.send(email);
    res.status(200).json({ email, result: "Sent Successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const sendContactUsEmail = async (formData) => {
  const msg = {
    to: "business@sadibazar.tech",
    from: formData.email,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p>Name: ${formData.name}</p>
      <p>Email: ${formData.email}</p>
      <p>Message: ${formData.message}</p>
    `,
  };

  return sgMail.send(msg);
};
