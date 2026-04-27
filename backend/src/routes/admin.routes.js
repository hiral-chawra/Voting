const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { startElection, stopElection } = require("../controllers/admin.controller");

const requireAdmin = roleMiddleware('admin');

const { getElectionStatus } = require("../controllers/admin.controller");
router.get("/status", getElectionStatus);

// Admin routes protected by auth + admin role check
router.post('/create', authMiddleware, requireAdmin, adminCtrl.createElection);
router.post('/candidate', authMiddleware, requireAdmin, adminCtrl.addCandidate);
router.get('/summary', authMiddleware, requireAdmin, adminCtrl.getSummary);

router.post("/start", authMiddleware, requireAdmin, adminCtrl.startElection);
router.post("/stop", authMiddleware, requireAdmin, adminCtrl.stopElection);

router.get("/status", adminCtrl.getElectionStatus);

module.exports = router;