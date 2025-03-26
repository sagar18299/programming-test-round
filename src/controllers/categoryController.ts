// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../services/categoryService';

export const create = async (req: Request, res: Response) => {
  
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    console.error('Get Category Error:', error);
    res.status(500).json({ error: 'Error fetching category' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ error: 'Error updating category' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const category = await deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ error: 'Error deleting category' });
  }
};
