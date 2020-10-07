import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import User from '@modules/users/infra/typeorm/entities/User';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function userReturn(user: User): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...UserWithoutPassword } = user;
  return UserWithoutPassword;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    // delete user.password;

    const UserWithoutPassword = userReturn(user);

    return response.json(UserWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    // delete user.password;

    const UserWithoutPassword = userReturn(user);

    return response.json(UserWithoutPassword);
  }
}
