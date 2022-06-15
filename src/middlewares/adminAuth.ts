import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ApiError from '../utils/apiError.utils';
import config from '../config/config';

interface TokenPayload {
  admin: boolean;
  sub: string;
}

export default function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApiError(402, true, 'JWT Token is missing.');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, config.jwtSecret);

    const { sub, admin } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
      admin,
    };

    if (request.user.admin === true) {
      return next();
    }
    throw new ApiError(402, true, 'User is not admin2.');
  } catch {
    throw new ApiError(402, true, 'User is not admin.');
  }
}
