import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderStatusDto {
  id: string;
  menuId: number;
  amount: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  @ApiProperty()
  status: OrderStatus;
}
