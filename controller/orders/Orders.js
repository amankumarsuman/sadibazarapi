import Order from "../../model/Orders.js";
import Pagination from "../../utils/pagination.js";
import axios from "axios";
import {
  USER_BASEURL,
  PRODUCTS_BASEURL,
  NOTIFICATIONS_BASEURL,
  SHIPPING_BASEURL,
} from "../../services/BaseURLs.js";

export const createOrder = async (req, res) => {
  try {
    const { data, token } = req.body;

    const order = new Order({
      order_id: data.orderId,
      name: {
        first: data.name.first,
        last: data.name.last,
      },
      email: data.email,
      phone_number: data.phone_number,
      //   address: JSON.parse(data.address),
      address: data.address,
      ordered_at: Date.now(),
      //   products: JSON.parse(data.products),
      products: token.cart,
      total: token.total,
    });

    await order.save();

    res.status(200).json({ order_id: order.order_id });
    const to = order.email;

    await axios.post(`${NOTIFICATIONS_BASEURL}/order-confirmation`, {
      to,
      order,
    });
    await axios.patch(`${PRODUCTS_BASEURL}/updateQuantity`, {
      products: order.products,
    });

    await axios.post(`${SHIPPING_BASEURL}`, {
      ordered_at: order.ordered_at,
      order_id: order.order_id,
      address: order.address,
      total: order.total,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const requiredOrder = await Order.findOne({ order_id: req.params.id });

    if (!requiredOrder) {
      return res.status(404).json({ message: "Order does not exist" });
    }

    const productIds = requiredOrder.products.map((pr) => pr.product_id);
    const { data } = await axios.post(`${PRODUCTS_BASEURL}/arr`, {
      arr: productIds,
    });

    res.status(200).json({ ...requiredOrder._doc, products: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const id = req.body.id;

    // verify the user's role by calling the `User` service
    // try {
    //   await axios.post(`${USER_BASEURL}/role`, { id, role: "ADMIN" });
    // } catch (e) {
    //   const { response } = e;
    //   return res.status(response.status).json(response.data);
    // }

    const orders = await Order.find().sort({ ordered_at: -1 });
    const ordersPaged = Pagination(req.query.page, orders);

    const total_pages = Math.ceil((await Order.count()) / 20);

    res.status(200).json({ total_pages, orders: ordersPaged });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderStatus = req.body.status;
    const id = req.body.id;

    // verify the user's role by calling the `User` service
    // try {
    //   await axios.post(`${USER_BASEURL}/role`, { id, role: "ADMIN" });
    // } catch (e) {
    //   const { response } = e;
    //   return res.status(response.status).json(response.data);
    // }

    if (
      !["CREATED", "PROCESSING", "FULFILLED", "CANCELLED"].includes(orderStatus)
    ) {
      return res.status(400).json({
        message:
          "Invalid status, has to be CREATED, PROCESSING, FULFILLED, CANCELLED",
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      {
        status: orderStatus,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order does not exist" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
