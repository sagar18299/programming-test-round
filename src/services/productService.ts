// src/services/product.service.ts
import  Product,{IProduct } from '../models/productModel';

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const getProducts = async (): Promise<IProduct[]> => {
  return await Product.find({}).populate('categories');
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id).populate('categories');
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, productData, { new: true }).populate('categories');
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};

// Optional: Get products by a specific category
export const getProductsByCategory = async (categoryId: string): Promise<IProduct[]> => {
  return await Product.find({ categories: categoryId }).populate('categories');
};
