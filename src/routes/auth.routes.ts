import express from "express";
import passport from "passport";
import { ensureAuthenticated } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Sign in with Google
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The user was successfully signed in
 *       500:
 *         description: An error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: An error occurred while signing in
 */
router.get("/google", (req, res, next) => {
  try {
    const redirectUrl =
      typeof req.query.redirectUrl === "string"
        ? req.query.redirectUrl
        : undefined;
    passport.authenticate("google", {
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
      state: redirectUrl,
    })(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while signing in");
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const redirectUrl =
      typeof req.query.state === "string" ? req.query.state : "/auth/success";
    res.redirect(redirectUrl);
  }
);

router.get("/failure", (req, res) => {
  res.send("Authentication failed");
});

router.get("/success", ensureAuthenticated, (req, res) => {
  res.send("Authentication successful");
});

export default router;
