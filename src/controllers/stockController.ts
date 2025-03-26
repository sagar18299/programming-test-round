import { Request, Response } from "express";
import {
  updateProductStock,
  getLowStockProducts,
  getOutOfStockProducts,
} from "../services/stockService";

export const updateStockLevel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { operation, amount } = req.body;

  try {
    if (!["add", "subtract"].includes(operation) || typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }

    const updatedProduct = await updateProductStock(id, operation, amount);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Stock updated", product: updatedProduct });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getLowStock = async (_req: Request, res: Response) => {
  try {
    const products = await getLowStockProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stock products" });
  }
};

export const getOutOfStock = async (_req: Request, res: Response) => {
  try {
    const products = await getOutOfStockProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching out-of-stock products" });
  }
};
