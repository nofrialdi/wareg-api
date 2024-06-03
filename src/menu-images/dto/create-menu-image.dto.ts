import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from '@nestjs/class-validator';
export class CreateMenuImagesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  menuId: number;

  @IsString()
  @ApiProperty()
  img1?: string;

  @IsString()
  @ApiProperty()
  img2?: string;

  @IsString()
  @ApiProperty()
  img3?: string;

  @IsString()
  @ApiProperty()
  img4?: string;
}
