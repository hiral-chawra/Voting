// SQL (Sequelize) connection placeholder
// Responsibilities:
// - Export a configured Sequelize instance and a connect helper
// - Default to an in-memory SQL DB for quick hackathon setup

const { Sequelize } = require('sequelize');
const path = require('path');

// Simple DB setup for beginners.
// - If you want to use MySQL, set DB_DIALECT=mysql and provide DB_HOST, DB_NAME, DB_USER, DB_PASS.
// - Otherwise this uses a local SQLite file located at ./data/database.sqlite for easy testing.

// -----------------------------------------------------------------------------
// LOCAL TEST CREDENTIALS (FOR BEGINNERS ONLY)
// If you prefer to hardcode credentials for quick local testing, fill these
// values below. Do NOT commit real credentials to source control.
// Uncomment and edit the lines below, or set the same values via environment vars.
// -----------------------------------------------------------------------------
/*
process.env.DB_DIALECT = 'mysql';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_NAME = 'Vote_Test';
process.env.DB_USER = 'root';
process.env.DB_PASS = 'YOURPASS';
*/

const useMySQL = (process.env.DB_DIALECT || '').toLowerCase() === 'mysql';

let sequelize;

if (useMySQL) {
    // Basic MySQL connection using env vars
    sequelize = new Sequelize(process.env.DB_NAME || 'Vote_Test', process.env.DB_USER || 'root', process.env.DB_PASS || '', {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: 'mysql',
        logging: false,
    });
} else {
    // Simple SQLite file for local development
    const storagePath = path.join(__dirname, '..', '..', 'data', 'database.sqlite');
    const fs = require('fs');
    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: storagePath,
        logging: false,
    });
}

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(useMySQL ? 'Connected to MySQL database' : 'Connected to SQLite database');
    } catch (err) {
        console.error('SQL DB connection error', err);
        throw err;
    }
}

module.exports = { sequelize, connectDB };