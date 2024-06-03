import { MenuImages } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MenuImagesEntity implements MenuImages {
  constructor(
    partial: Partial<MenuImagesEntity> | Partial<MenuImagesEntity[]>,
  ) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  menuId: number;
  @ApiProperty()
  img1: string;
  @ApiProperty()
  img2: string;
  @ApiProperty()
  img3: string;
  @ApiProperty()
  img4: string;
}
