const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { addComment, getComments } = require("../controllers/comment.controller");

// POST /api/comment
router.post("/comment", authMiddleware.authUserMiddleware, addComment);

// GET /api/comments/:foodId
router.get("/comments/:foodId", getComments);

module.exports = router;
