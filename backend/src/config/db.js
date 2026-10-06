const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

function createSqliteSequelize() {
    const isVercel = !!process.env.VERCEL;
    const storagePath = isVercel
        ? path.join('/tmp', 'database.sqlite')
        : path.join(__dirname, '..', '..', 'data', 'database.sqlite');

    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    return new Sequelize({
        dialect: 'sqlite',
        storage: storagePath,
        logging: false,
    });
}

const dialect = (process.env.DB_DIALECT || 'sqlite').toLowerCase();
const isPostgres = dialect === 'postgres' || dialect === 'postgresql' || !!process.env.DATABASE_URL;
const isMySQL = dialect === 'mysql';

let sequelize;

if (isPostgres) {
    const config = process.env.DATABASE_URL ? process.env.DATABASE_URL : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        database: process.env.DB_NAME || 'postgres',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '',
        dialect: 'postgres',
        dialectOptions: {
            connectTimeout: 5000,
            ssl: process.env.DB_SSL === 'false' ? false : {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
    };
    sequelize = process.env.DATABASE_URL 
        ? new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            dialectOptions: { connectTimeout: 5000, ssl: process.env.DB_SSL === 'false' ? false : { require: true, rejectUnauthorized: false } },
            logging: false
        })
        : new Sequelize(config);
} else if (isMySQL) {
    sequelize = new Sequelize(process.env.DB_NAME || 'Vote_Test', process.env.DB_USER || 'root', process.env.DB_PASS || '', {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: 'mysql',
        logging: false,
    });
} else {
    sequelize = createSqliteSequelize();
}

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(`✅ Connected to ${sequelize.getDialect()} database`);
    } catch (err) {
        if (isPostgres) {
            console.warn('⚠️ PostgreSQL unreachable. Falling back to SQLite...');
            sequelize = createSqliteSequelize();
            await sequelize.authenticate();
            console.log(`✅ Connected to fallback sqlite database`);
        } else {
            console.error('❌ SQL DB connection error:', err.message);
            throw err;
        }
    }
}

module.exports = {
    get sequelize() { return sequelize; },
    connectDB
};