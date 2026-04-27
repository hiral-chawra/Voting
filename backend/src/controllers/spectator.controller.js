// backend/src/controllers/spectator.controller.js

const { Candidate } = require("../models");

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.findAll({
            order: [["voteCount", "DESC"]],
        });

        return res.status(200).json({
            success: true,
            candidates,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getFinalResults = async (req, res) => {
    try {
        const candidates = await Candidate.findAll({
            order: [["voteCount", "DESC"]],
        });

        const results = candidates.map((c) => ({
            id: c.id,
            name: c.name,
            party: c.party,
            votes: c.voteCount,
        }));

        return res.status(200).json({
            success: true,
            results,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};