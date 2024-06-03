import { ApiProperty } from '@nestjs/swagger';

export class QueryMenu {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  calories: string;

  @ApiProperty()
  description: string;
}
