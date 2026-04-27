// Beginner-friendly Admin controller
// Small, clear examples for creating elections and candidates.

const Election = require('../models/Election');
const Candidate = require('../models/Candidate');

// Create a new election (very basic)
exports.createElection = async (req, res) => {
    try {
        const { name, startTime, endTime, level, state } = req.body || {};
        if (!name || !startTime || !endTime) return res.status(400).json({ error: 'name, startTime and endTime required' });

        const election = await Election.create({ name, startTime, endTime, level: level || 'local', state: state || null });
        return res.json({ id: election.id, name: election.name });
    } catch (err) {
        console.error('createElection error', err);
        return res.status(500).json({ error: 'Could not create election' });
    }
};

// Add a candidate to an election
exports.addCandidate = async (req, res) => {
    try {
        const { electionId, name, party, symbol, constituency, constituencyType, state } = req.body || {};
        if (!electionId || !name || !party || !symbol || !constituency || !constituencyType || !state) {
            return res.status(400).json({ error: 'electionId, name, party, symbol, constituency, constituencyType and state are required' });
        }

        const candidate = await Candidate.create({ name, party, symbol, electionId, constituency, constituencyType, state });
        return res.json({ id: candidate.id, name: candidate.name });
    } catch (err) {
        console.error('addCandidate error', err);
        return res.status(500).json({ error: 'Could not add candidate' });
    }
};

// Simple summary: return all elections (starter example)
exports.getSummary = async (req, res) => {
    try {
        const elections = await Election.findAll();
        return res.json({ elections });
    } catch (err) {
        console.error('getSummary error', err);
        return res.status(500).json({ error: 'Could not fetch summary' });
    }
};

// START election
exports.startElection = async (req, res) => {
    await Election.update(
        { status: 'live' },
        { where: {} }
    );

    res.json({ message: "Election started" });
};

//STOP election
exports.stopElection = async (req, res) => {
    await Election.update(
        { status: 'completed' },
        { where: {} }
    );

    res.json({ message: "Election stopped" });
};

// =============================
// GET ELECTION STATUS
// =============================
exports.getElectionStatus = async (req, res) => {
    try {
        const election = await Election.findOne({
            order: [['createdAt', 'DESC']]
        });

        if (!election) {
            return res.json({ status: "none" });
        }

        return res.json({
            status: election.status
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};