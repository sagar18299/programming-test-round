import Product, { IProduct } from "../models/productModel";

export const updateProductStock = async (
  productId: string,
  operation: "add" | "subtract",
  amount: number
): Promise<IProduct | null> => {
  const product = await Product.findById(productId);
  if (!product) return null;

  if (operation === "add") {
    product.quantity += amount;
  } else if (operation === "subtract") {
    if (product.quantity < amount) {
      throw new Error("Insufficient stock");
    }
    product.quantity -= amount;
  } else {
    throw new Error("Invalid operation");
  }

  product.lastUpdated = new Date();
  return await product.save();
};

export const getLowStockProducts = async (): Promise<IProduct[]> => {
  return await Product.find({
    $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
  });
};

export const getOutOfStockProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ quantity: { $eq: 0 } });
};
