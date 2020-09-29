import { Request, Response } from 'express';
import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function userReturn(user: User): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...UserWithoutPassword } = user;
  return UserWithoutPassword;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // delete user.password;

    const UserWithoutPassword = userReturn(user);

    return response.json({ UserWithoutPassword, token });
  }
}
