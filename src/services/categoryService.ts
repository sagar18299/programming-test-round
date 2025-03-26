// src/services/category.service.ts
import  Category,{ ICategory } from '../models/categoryModel';

export const createCategory = async (data: Partial<ICategory>): Promise<ICategory> => {
  const category = new Category(data);
  return await category.save();
};

export const getCategories = async (): Promise<ICategory[]> => {
  return await Category.find({});
};

export const getCategoryById = async (id: string): Promise<ICategory | null> => {
  return await Category.findById(id);
};

export const updateCategory = async (
  id: string,
  data: Partial<ICategory>
): Promise<ICategory | null> => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return await Category.findByIdAndDelete(id);
};
