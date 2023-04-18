import ComboProduct from "../../model/combo.js";

// create a new combo product
export const createComboProduct = async (req, res) => {
  const { products, specialPrice } = req.body;
  try {
    const comboProduct = await ComboProduct.create({ products, specialPrice });
    res.status(201).json({ status: true, comboProducts: comboProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all combo products
export const getComboProducts = async (req, res) => {
  try {
    const comboProducts = await ComboProduct.find();
    res.status(200).json({ status: true, comboProducts: comboProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a single combo product by ID
export const getComboProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const comboProduct = await ComboProduct.findById(id);
    if (!comboProduct) {
      return res.status(404).json({ message: "Combo product not found" });
    }
    res.status(200).json({ status: true, comboProducts: comboProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a combo product by ID
export const updateComboProductById = async (req, res) => {
  const { id } = req.params;
  const { products, specialPrice } = req.body;
  try {
    const comboProduct = await ComboProduct.findByIdAndUpdate(
      id,
      { products, specialPrice },
      { new: true }
    );
    if (!comboProduct) {
      return res.status(404).json({ message: "Combo product not found" });
    }
    res
      .status(200)
      .json({
        status: true,
        msg: "Combo Product Updated Successfully",
        comboProducts: comboProduct,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a combo product by ID
export const deleteComboProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const comboProduct = await ComboProduct.findByIdAndDelete(id);
    if (!comboProduct) {
      return res.status(404).json({ message: "Combo product not found" });
    }
    res.status(200).json({ message: "Combo product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
