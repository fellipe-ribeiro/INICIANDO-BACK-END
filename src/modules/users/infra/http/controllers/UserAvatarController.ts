import { Request, Response } from 'express';
import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function userReturn(user: User): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...UserWithoutPassword } = user;
  return UserWithoutPassword;
}

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    //  delete user.password;

    const UserWithoutPassword = userReturn(user);

    return response.json(UserWithoutPassword);
  }
}
