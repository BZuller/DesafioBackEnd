import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';
import ApiError from '../utils/apiError.utils';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new ApiError(401, false, 'Missing JWT Token!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, config.jwtSecret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new ApiError(401, false, 'JWT Token inválido!');
  }
}
