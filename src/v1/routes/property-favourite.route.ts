import { Router } from "express";
import { jwtAuthMiddleware } from "../../middlewares/jwt.auth.middleware";
import { addToFavorites, getFavoriteProperties, removeFromFavorites } from "../controllers/property.favourite.controller";

const router=Router()
/**
 * @swagger
 * /api/v1/favorite:
 *   get:
 *     summary: Get all favorite properties of the signed-in user
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 favorites:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */
router.get('/', jwtAuthMiddleware, getFavoriteProperties);
/**
 * @swagger
 * /api/v1/favorite/{id}:
 *   post:
 *     summary: Add a property to user's favorites
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property added to favorites
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.post('/:id', jwtAuthMiddleware, addToFavorites);

/**
 * @swagger
 * /api/v1/favorite/{id}:
 *   delete:
 *     summary: Remove a property from user's favorites
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property removed from favorites
 *       500:
 *         description: Server error
 */
router.delete('/:id', jwtAuthMiddleware, removeFromFavorites);

export default router