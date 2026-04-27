// Beginner-friendly Election model (Sequelize)
// Fields:
// - name: election name
// - status: draft/live/ended
// - startTime / endTime: optional scheduling
//
// Example usage:
//   const Election = require('./models/Election');
//   await Election.create({ name: 'Student Council', startTime: null, endTime: null });

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Election = sequelize.define('Election', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('local', 'state', 'national'),
        allowNull: false,
        defaultValue: 'local'
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'live', 'ended'),
        allowNull: false,
        defaultValue: 'upcoming'
    },

}, { timestamps: true });

module.exports = Election;
