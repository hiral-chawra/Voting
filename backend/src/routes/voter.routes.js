// backend/src/routes/voter.routes.js

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const voterCtrl = require("../controllers/voter.controller");

router.post("/vote", authenticate, voterCtrl.castVote);

module.exports = router;