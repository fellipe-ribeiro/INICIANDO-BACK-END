import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

import User from '@modules/users/infra/typeorm/entities/User';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function userReturn(user: User): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...UserWithoutPassword } = user;
  return UserWithoutPassword;
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // delete user.password;

    const UserWithoutPassword = userReturn(user);

    return response.json(UserWithoutPassword);
  }
}
