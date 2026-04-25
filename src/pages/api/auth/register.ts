import type { APIRoute } from 'astro';
import { getDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export const POST: APIRoute = async ({ request }) => {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { username, password } = await request.json();

        // Validate input
        if (!username || !password) {
            return new Response(JSON.stringify({ message: 'Username and password required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (username.length < 3) {
            return new Response(JSON.stringify({ message: 'Username must be at least 3 characters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (password.length < 6) {
            return new Response(JSON.stringify({ message: 'Password must be at least 6 characters' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const db = getDatabase();
        
        // Check if user exists
        const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'Username already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);
        
        const userId = result.lastInsertRowid;

        // Create JWT token
        const token = jwt.sign(
            { userId, username },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return new Response(JSON.stringify({ 
            token,
            message: 'Account created successfully'
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ message: error.message || 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
