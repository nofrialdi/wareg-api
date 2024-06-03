import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  constructor(partial: Partial<MenuEntity> | Partial<MenuEntity[]>) {
    Object.assign(this, partial);
  }
  userId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  categoryId: string;

  createdAt: Date;

  updatedAt: Date;
  @ApiProperty()
  calories: string;
  @ApiProperty()
  description: string;
}
