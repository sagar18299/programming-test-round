import mongoose, { Schema, Document } from 'mongoose';

export  interface IProduct extends Document {
  name: string;
  description: string;
  categories: Schema.Types.ObjectId[];
  quantity: number;
  price: number;
  supplierInfo?: string;
  dateAdded: Date;
  lastUpdated: Date;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  supplierInfo: { type: String },
  lowStockThreshold: { type: Number, default: 10 }, // optional

  dateAdded: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
