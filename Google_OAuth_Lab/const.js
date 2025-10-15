import { config } from 'dotenv';

config();

export const PORT = process.env.PORT;
console.log(`reading env variables, PORT: ${PORT}`);
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
export const JWT_SECRET = process.env.JWT_SECRET;

// callback url must be same to the one we registered on Google Console
export const GOOGLE_CALLBACK_URL = "/auth/google/callback";