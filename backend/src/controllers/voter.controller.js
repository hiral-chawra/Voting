// backend/src/controllers/voter.controller.js

const { Vote, Candidate, Election } = require("../models");
const { sequelize } = require("../models");
const crypto = require("crypto");



exports.castVote = async (req, res) => {
  const t = await sequelize.transaction();

  try {

    const voterId = req.user.id;  //----- Assuming user ID is available in req.user -----//
    const { candidateId, electionId } = req.body;

    if (!candidateId || !electionId) {
      await t.rollback();
      return res.status(400).json({ error: "candidateId and electionId required" });
    }

    const election = await Election.findByPk(electionId);
    
    console.log("Incoming electionId:", electionId);
    console.log("Election found:", election);

    if (!election || election.status !== "live") {
      await t.rollback();
      return res.status(400).json({ error: "Election not active" });
    }

    const existingVote = await Vote.findOne({
      where: { voterId, electionId },
    });

    if (existingVote) {
      await t.rollback();
      return res.status(400).json({ error: "You have already voted" });
    }

    const candidate = await Candidate.findOne({
      where: { id: candidateId, electionId }
    });

    if (!candidate) {
      await t.rollback();
      return res.status(400).json({ error: "Invalid candidate" });
    }

    const voteHash = crypto
      .createHash("sha256")
      .update(`${voterId}-${candidateId}-${electionId}-${Date.now()}`)
      .digest("hex");

    await Vote.create(
      { voterId, candidateId, electionId, voteHash },
      { transaction: t }
    );

    await Candidate.increment(
      { voteCount: 1 },
      { where: { id: candidateId }, transaction: t }
    );

    await t.commit();

    return res.status(200).json({
      success: true,
      message: "Vote cast successfully",
    });

  } catch (error) {
    await t.rollback();
    return res.status(500).json({ error: error.message });
  }
};

