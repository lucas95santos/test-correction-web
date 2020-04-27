import User from '../models/User';

class UserController {
  async store(request, response) {
    const userExists = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (userExists) {
      return response.status(400).json({
        error: `Já existe cadastro para esse e-mail`,
      });
    }

    const { id, name, email, active } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
      active,
    });
  }
}

export default new UserController();
