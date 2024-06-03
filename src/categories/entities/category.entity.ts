import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Menu } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  menus: Menu[];
}
