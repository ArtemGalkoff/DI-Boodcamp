import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' }
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (error) {
    return null;
  }
};