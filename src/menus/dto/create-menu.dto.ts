import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from '@nestjs/class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  categoryId: string;

  @IsNumber()
  userId: number;
  @ApiProperty()
  calories: string;
  @ApiProperty()
  description: string;
}
