import nodemailer from "nodemailer";

export const partnerwithus = async (req, res) => {
  try {
    const { name, email, message, mobile, city, address } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "business@sadibazar.tech",
        pass: "Alka@143",
      },
    });

    const mailOptions = {
      from: "business@sadibazar.tech",
      to: "business@sadibazar.tech",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Mobile: ${mobile}</p>
        <p>City: ${city}</p>
        <p>Address: ${address}</p>
        <p>Message: ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export const sendOrder = async (req, res) => {
  const { data, token } = req.body;

  const productsHtml = token?.cart
    ?.map(
      (el) => `
  <div>
    <img src="${el.image}" />
    <h1>Name: ${el.name}</h1>
    <p>${el.price}</p>
    <h1>Quantity: ${el.quantity}</h1>
  </div>
`
    )
    .join("");
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "business@sadibazar.tech",
        pass: "Alka@143",
      },
    });

    const mailOptions = {
      from: "business@sadibazar.tech",
      to: data?.email,
      subject: "Order Details",
      html: `
        <h2>Order Details</h2>
        <p>Name: ${data?.name?.first} ${data?.name?.last}</p>
        <p>Address: ${data?.address}</p>
        <p>Mobile: ${data?.phone_number}</p>
        <p>OrderId: ${data?.order_id}</p>
       <p>Products:</p>
    ${productsHtml}
       `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
