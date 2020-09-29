import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHasheProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
