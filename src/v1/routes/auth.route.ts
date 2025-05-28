import { Router } from "express";
import { validateRegister } from "../../middlewares/auth.validation.middleware";
import { sendSuccess } from "../../utils/helper";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../controllers/auth.controller";
const router=Router()
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *      
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post('/register', validateRegister,registerUser);


export default router