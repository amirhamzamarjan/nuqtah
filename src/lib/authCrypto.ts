import { AdminRole, AdminUser } from '../types';

/**
 * SHA-256 Web Crypto Hashing for password verification
 */
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface AdminAccountRecord {
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  passwordHash: string; // SHA-256
  active: boolean;
}

// Initial authorized admin profiles with secure cryptographic hash (SHA-256 of "nuqtah2026")
export const INITIAL_ADMIN_ACCOUNTS: AdminAccountRecord[] = [
  {
    username: 'admin',
    email: 'admin@nuqtah.com',
    displayName: 'Chief Administrator',
    role: 'Super Admin',
    passwordHash: '3542b9d4bff47f36d250886233847ee88375dbd52761777f69d075498be80950',
    active: true,
  },
  {
    username: 'store_manager',
    email: 'store@nuqtah.com',
    displayName: 'Boutique Store Manager',
    role: 'Store Manager',
    passwordHash: '3542b9d4bff47f36d250886233847ee88375dbd52761777f69d075498be80950',
    active: true,
  },
  {
    username: 'content_manager',
    email: 'content@nuqtah.com',
    displayName: 'Editorial Content Manager',
    role: 'Content Manager',
    passwordHash: '3542b9d4bff47f36d250886233847ee88375dbd52761777f69d075498be80950',
    active: true,
  },
];

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: number; // timestamp
}
