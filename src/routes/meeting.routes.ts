import { Router } from "express";
import meetingController from "../controllers/meeting.controller";
import validate from "../middleware/validation.middleware";
import meetingSchema from "../validations/meeting.validation";
import { ensureAuthenticated } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Schedule a new meeting
 *     tags: [Meeting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: The meeting was successfully scheduled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", ensureAuthenticated, validate(meetingSchema), meetingController.scheduleMeeting);

/**
 * @swagger
 * /meeting:
 *   get:
 *     summary: Get the meetings of a specific user
 *     tags: [Meeting]
 *     responses:
 *       200:
 *         description: The meeting details of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meetings'
 *       400:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No meetings found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", ensureAuthenticated, meetingController.getMeetings);

export default router;