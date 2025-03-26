import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getByCategory

} from "../controllers/productController";
import {
  updateStockLevel,
  getLowStock,
  getOutOfStock,
} from "../controllers/stockController";
import { authenticateJWT, authorizeRole } from "../middleware/auth";

const productRouter = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All Products
 *     description: Retrieve a list of products with optional filters.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Filter by category ID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         description: Filter by product name (partial match)
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         description: Filter by minimum price
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         description: Filter by maximum price
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: A list of products retrieved successfully
 *       '500':
 *         description: Internal server error
 */
productRouter.get("/", getAll);



/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get Product by ID
 *     description: Retrieve a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Product retrieved successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
productRouter.get("/:id", getOne);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: create a Product
 *     description: create an existing product. Requires admin authorization.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["605c3c2e9e1f8b0015aebdc1"]
 *               quantity:
 *                 type: integer
 *                 example: 120
 *               price:
 *                 type: number
 *                 example: 34.99
 *               supplierInfo:
 *                 type: string
 *                 example: "Updated Supplier"
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */

productRouter.post("/", authenticateJWT, authorizeRole("admin"), create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a Product
 *     description: Update an existing product. Requires admin authorization.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: productData
 *         description: Updated data for the product.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: New name of the product
 *             description:
 *               type: string
 *               description: New description
 *             categoryId:
 *               type: integer
 *               description: New category ID
 *             price:
 *               type: number
 *               description: New price
 *             supplierInfo:
 *               type: string
 *               description: New supplier information
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
productRouter.put("/:id", authenticateJWT, authorizeRole("admin"), update);



/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a Product
 *     description: Delete an existing product. Requires admin authorization.
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
productRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRole("admin"),
  remove
);

productRouter.patch("/:id/stock", authenticateJWT,authorizeRole("admin"), updateStockLevel);
productRouter.get("/alerts/low-stock", authenticateJWT,authorizeRole("admin"), getLowStock);
productRouter.get("/alerts/out-of-stock", authenticateJWT,authorizeRole("admin"), getOutOfStock);


export default productRouter;
