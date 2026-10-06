const User = require('./User');
const Election = require('./Election');
const Candidate = require('./Candidate');
const Vote = require('./Vote');
const { sequelize } = require('../config/db');

// USER → VOTE
User.hasMany(Vote, {
    foreignKey: 'voterId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Vote.belongsTo(User, {
    foreignKey: 'voterId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


// ELECTION → CANDIDATE
Election.hasMany(Candidate, {
    foreignKey: 'electionId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Candidate.belongsTo(Election, {
    foreignKey: 'electionId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


// ELECTION → VOTE
Election.hasMany(Vote, {
    foreignKey: 'electionId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Vote.belongsTo(Election, {
    foreignKey: 'electionId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});


// CANDIDATE → VOTE
Candidate.hasMany(Vote, {
    foreignKey: 'candidateId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Vote.belongsTo(Candidate, {
    foreignKey: 'candidateId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});
//parent child relationship between candidate and vote, one candidate can have many votes but each vote belongs to one candidate

module.exports = { User, Election, Candidate, Vote, sequelize };