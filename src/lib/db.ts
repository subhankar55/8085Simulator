import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

// Database file path in project root
const dbPath = path.join(process.cwd(), 'users.json');

interface User {
    id: string;
    username: string;
    password_hash: string;
    created_at: string;
}

interface Database {
    users: User[];
}

function readDatabase(): Database {
    try {
        if (existsSync(dbPath)) {
            const data = readFileSync(dbPath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (e) {
        console.error('Error reading database:', e);
    }
    return { users: [] };
}

function writeDatabase(data: Database) {
    try {
        writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('Error writing database:', e);
    }
}

export function getDatabase() {
    return {
        prepare: (sql: string) => {
            return {
                get: (username: string) => {
                    const db = readDatabase();
                    if (sql.includes('SELECT') && sql.includes('FROM users')) {
                        return db.users.find(u => u.username === username);
                    }
                    return null;
                },
                run: (username: string, passwordHash: string) => {
                    const db = readDatabase();
                    const user: User = {
                        id: Math.random().toString(36).substr(2, 9),
                        username,
                        password_hash: passwordHash,
                        created_at: new Date().toISOString()
                    };
                    db.users.push(user);
                    writeDatabase(db);
                    return { lastInsertRowid: user.id };
                }
            };
        }
    };
}
