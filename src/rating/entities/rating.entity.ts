import { Ratings } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RatingsEntity implements Ratings {
  constructor(partial: Partial<RatingsEntity> | Partial<RatingsEntity[]>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  menuId: number;
}
