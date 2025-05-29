import { Router } from "express";
import { validateProperty } from "../../middlewares/property.validation.middleware";
import { jwtAuthMiddleware } from "../../middlewares/jwt.auth.middleware";
import { createProperty } from "../controllers/property.controller";

const router =Router()
/**
 * @swagger
 * /api/v1/property:
 *   post:
 *     summary: Create a new property for authenticated user
 *     tags: [Property]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProperty'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 */
router.post('/', validateProperty,jwtAuthMiddleware,createProperty );
export default router