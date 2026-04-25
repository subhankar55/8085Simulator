import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash);
}

export function generateUserId(): string {
    return Math.random().toString(36).substr(2, 9);
}
