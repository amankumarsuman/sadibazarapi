import Users from "../../model/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateJWt = (data) => {
  console.log(data, "<<<<datasss");
  const token = jwt.sign(
    {
      ...data,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};
const saltRounds = 10;
const getHashPass = async (pass) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email address is not provided" });
  if (!password)
    return res
      .status(400)
      .json({ message: "Password address is not provided" });

  try {
    const user = await Users.findOne({ email });

    if (!user) return res.status(404).json({ message: "User was not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        phone: user.phone,
        address: user.address,
        role: user.role,
        wishlist: user.wishlist,
      },
      token,
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//Post Method
export const register = async (req, res) => {
  // const id = uuid.v4();

  const token = await generateJWt({
    email: req.body.email,
    role: req.body.role,
  });

  const data = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: await getHashPass(req.body.password),
    // password: req.body.password,
    role: req.body.role,
    jwtToken: token,
    // emailVerified: false,
    phone: req.body.phone,
    wishlist: req.body.wishlist,
  });

  try {
    const dataToSave = await data.save().then((result) => {
      res.status(200).send({ success: true, data: result });
    });

    // sendMail(dataToSave.email);
  } catch (error) {
    // console.log(error);
    if (error.message.match("email_1 dup key")) {
      res.status(400).send({
        success: false,
        message: "Already have an account from this email",
      });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const verifyUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await Users.findById(id, { password: 0 });
    return res.status(200).json({ ...user?._doc });
  } catch (e) {
    return res.status(404).json({ message: "User not found" });
  }
};

export const verifyRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    const user = await Users.findById(id, { password: 0 });

    if (!user)
      return res.status(404).json({ message: `User ${id} was not found` });

    if (role !== user.role)
      return res.status(401).json({ message: "Unauthorized user" });

    return res.status(200).json({ user });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
