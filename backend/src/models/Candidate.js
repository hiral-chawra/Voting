// Beginner-friendly Candidate model (Sequelize)
// Fields:
// - name: candidate's full name
// - symbol: short symbol or party
// - electionId: id of the election this candidate belongs to
//
// Note: Associations (Candidate.belongsTo(Election)) can be added in a central
// models/index.js for larger projects. For this starter scaffold we keep it simple.

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Candidate = sequelize.define('Candidate', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    party: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false
    },
    electionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    constituency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    constituencyType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    voteCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, { timestamps: true });

module.exports = Candidate;
