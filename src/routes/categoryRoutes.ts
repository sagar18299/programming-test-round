import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove
} from "../controllers/categoryController";
import { authenticateJWT, authorizeRole } from "../middleware/auth";

const categoryRouter = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get All Categories
 *     description: Retrieve a list of all categories.
 *     tags:
 *       - Categories
 *     responses:
 *       '200':
 *         description: A list of categories retrieved successfully
 *       '500':
 *         description: Internal server error
 */
categoryRouter.get("/", getAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get Category by ID
 *     description: Retrieve a category by its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category retrieved successfully
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */
categoryRouter.get("/:id", getOne);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a New Category
 *     description: Create a new category. Requires admin authorization.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 description: Description of the category
 *              
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '500':
 *         description: Internal server error
 */

categoryRouter.post("/", authenticateJWT, authorizeRole("admin"), create);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a Category
 *     description: Update an existing category. Requires admin authorization.
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the category
 *               description:
 *                 type: string
 *                 description: New description of the category
 *               
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */

categoryRouter.put("/:id", authenticateJWT, authorizeRole("admin"), update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a Category
 *     description: Delete an existing category. Requires admin authorization.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '401':
 *         description: Unauthorized Access - Missing or invalid token
 *       '403':
 *         description: Forbidden - Insufficient permissions
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */
categoryRouter.delete("/:id", authenticateJWT, authorizeRole("admin"), remove);

export default categoryRouter;
