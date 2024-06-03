import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  calories: string;

  @ApiProperty()
  description: string;
}
