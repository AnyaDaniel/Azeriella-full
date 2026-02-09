import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// Generate a hash: bcrypt.hashSync('your-password', 10)
// Default password: 'admin123' (CHANGE THIS IN PRODUCTION!)
const DEFAULT_HASH = '$2b$10$tnTnzmY9CHs2Qz3F9XCG9.wos2HtJxg2XlyAXorHLZAstFz5n8xC2';

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  console.log('verifyAdmin called:', { username, password, envUsername: ADMIN_USERNAME, hasEnvHash: !!ADMIN_PASSWORD_HASH });
  
  // Temporary: Allow simple password for testing
  if (username === 'admin' && password === 'admin123') {
    console.log('Using temporary bypass - REMOVE IN PRODUCTION!');
    return true;
  }
  
  if (username !== ADMIN_USERNAME) {
    console.log('Username mismatch');
    return false;
  }
  
  const hash = ADMIN_PASSWORD_HASH || DEFAULT_HASH;
  console.log('Using hash:', hash.substring(0, 20) + '...');
  
  const result = await bcrypt.compare(password, hash);
  console.log('Compare result:', result);
  
  return result;
}

export async function isAuthenticated(req?: NextRequest): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token');
    
    if (!token) return false;
    
    // Simple token validation (in production, use JWT or similar)
    const [username, timestamp] = token.value.split(':');
    const tokenTime = parseInt(timestamp);
    const now = Date.now();
    
    // Token expires after 24 hours
    if (now - tokenTime > 24 * 60 * 60 * 1000) {
      return false;
    }
    
    return username === ADMIN_USERNAME;
  } catch {
    return false;
  }
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const token = `${ADMIN_USERNAME}:${Date.now()}`;
  
  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-token');
}
