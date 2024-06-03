import { ApiProperty } from '@nestjs/swagger';

export class UpdateRatingDto {
  @ApiProperty()
  rating: number;
}
