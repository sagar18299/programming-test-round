// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} from '../services/productService';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Get All Products Error:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Get One Product Error:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await getProductsByCategory(categoryId);
    res.json(products);
  } catch (error) {
    console.error('Get Products by Category Error:', error);
    res.status(500).json({ error: 'Error fetching products by category' });
  }
};
