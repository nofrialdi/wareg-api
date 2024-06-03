import { User, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  username: string;
  @Exclude()
  password: string;
  role: Role;
  address: string;
  email: string;
  phoneNumber: string;
}
