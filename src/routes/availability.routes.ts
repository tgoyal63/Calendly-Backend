import { Router } from "express";
import availabilityController from "../controllers/availability.controller";
import { ensureAuthenticated } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /availability/:userId:
 *   get:
 *     summary: Get the availabilities of the user
 *     tags: [Availability]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The username or email of the user
 *     responses:
 *       200:
 *         description: The availabilities of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example: 
 *               message: Email or Username is required
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/:userId",
  availabilityController.getAvailability
)

/**
 * @swagger
 * /availability:
 *   get:
 *     summary: Get the availabilities of the user
 *     tags: [Availability]
 *     responses:
 *       200:
 *         description: The availabilities of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Availability'
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example: 
 *               message: Meeting date should be in future.
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/",
  ensureAuthenticated,
  availabilityController.getAvailability
);

export default router;