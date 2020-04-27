import jwt from 'jsonwebtoken';
// model
import User from '../models/User';
// authentication config
import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return response
        .status(404)
        .json({ error: 'A senha informada está incorreta' });
    }

    const { id, name, active } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        active,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
