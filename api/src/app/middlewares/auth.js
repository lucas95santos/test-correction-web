import jwt from 'jsonwebtoken';
// transform callback functions in async/await functions
import { promisify } from 'util';
// authentication cofig
import authCofig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: 'Acesso negado. Forneça o token de autenticação',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authCofig.secret);
    request.userId = decoded.id;

    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: 'Acesso negado. O token fornecido não é válido' });
  }
};
