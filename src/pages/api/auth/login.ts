import type { APIRoute } from 'astro';
import { getDatabase } from '../../../lib/db';
import { comparePassword } from '../../../lib/auth';
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

        const db = getDatabase();
        
        // Find user
        const user = db.prepare('SELECT id, username, password_hash FROM users WHERE username = ?').get(username);

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check password
        const isValidPassword = await comparePassword(password, user.password_hash);
        if (!isValidPassword) {
            return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return new Response(JSON.stringify({ 
            token,
            message: 'Login successful'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ message: error.message || 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
