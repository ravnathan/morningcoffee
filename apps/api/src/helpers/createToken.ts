import { sign } from 'jsonwebtoken';

export interface Ipayload {
  id: string;
  role: string;
}

const key = process.env.SECRET_KEY || 'Temporarykey';

export const createLoginToken = (payload: Ipayload) => {
  try {
    const token = sign(payload, key, { expiresIn: '24h' });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token generation failed");
  }
};
