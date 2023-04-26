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
    <img src=${el.image} />
    <h6>Products: ${el.name}</h6>
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
        <h4>Address:</h4>
        <p>Building No:${data?.address?.building_number}</p>
        <p>Floor No:${data?.address?.floor}</p>
        <p>Street No:${data?.address?.street}</p>
        <p>Building No:${data?.address?.building}</p>
<p>City:${data?.address?.city}</p>
<p>Area:${data?.address?.area}</p>
<p>Country:${data?.address?.country}</p>

        <p>Mobile: ${data?.phone_number}</p>
        <p>OrderId: ${data?.orderId}</p>
       <p>Products:</p>
    ${productsHtml}
    <br/>
    <hr/>
    <h2>Sadibazar Team</h2>
    <img src="https://sadibazar.tech/static/media/sbazarlogo.711e7e55325cf74a5436.png"/>
       `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
