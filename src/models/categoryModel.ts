import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
