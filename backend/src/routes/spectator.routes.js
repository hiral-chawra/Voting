const express = require("express");
const router = express.Router();

const { getCandidates, getFinalResults } = require("../controllers/spectator.controller");

router.get("/candidates", getCandidates);
router.get("/live", getCandidates);
router.get("/results", getFinalResults);
router.get("/final", getFinalResults);

module.exports = router;