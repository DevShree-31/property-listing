import { Router } from "express";
import { jwtAuthMiddleware } from "../../middlewares/jwt.auth.middleware";
import { receivedRecommedations, sendRecommendation } from "../controllers/recommendation.controller";

const router = Router();
/**
 * @swagger
 * /api/v1/recommendations:
 *   post:
 *     summary: Send a recommendation of property to a user using email
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendRecommendation'
 *     responses:
 *       '201':
 *         description: Recommendation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       '400':
 *         description: Invalid input
 *       '401':
 *         description: Unauthorized (missing or invalid JWT token)
 */

router.post('/', jwtAuthMiddleware, sendRecommendation);

/**
 * @swagger
 * /api/v1/recommendations:
 *   get:
 *     summary: Retrieve received recommendations for the authenticated user
 *     tags:
 *       - Recommendations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       '401':
 *         description: Unauthorized (missing or invalid JWT token)
 */
router.get('/', jwtAuthMiddleware, receivedRecommedations)
export default router;