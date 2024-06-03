import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  menuId: number;

  userId: number;
}
