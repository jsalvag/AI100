import { getDatabasePath, getDb } from './database.ts';

getDb();
console.log(`Seeded SQLite database at ${getDatabasePath()}`);
