# Backend - Simple Setup

This backend is a beginner-friendly Express + Sequelize app.

Quick overview:
- `src/config/db.js` — sets up Sequelize. Use MySQL by setting `DB_DIALECT=mysql` and required env vars, otherwise it uses a local SQLite file for easy testing.
- `src/server.js` — starts Express and runs `sequelize.sync()` (non-destructive by default).

Run with SQLite (quick):

```powershell
cd c:\Users\A\Desktop\Voting\voterCode\backend
npm install
node src/server.js
```

Run with MySQL:

```powershell
cd c:\Users\A\Desktop\Voting\voterCode\backend
npm install
$env:DB_DIALECT='mysql'; $env:DB_HOST='localhost'; $env:DB_PORT='3306'; $env:DB_NAME='Vote_Test'; $env:DB_USER='root'; $env:DB_PASS='YOURPASS'; node src/server.js
```

Notes for beginners:
- `sequelize.sync()` will create missing tables but will not alter existing tables. Use `sequelize.sync({ force: true })` to drop & recreate tables (this removes data).
- If you change model primary keys or critical columns, you may need to drop the existing DB tables first to avoid ALTER errors.
