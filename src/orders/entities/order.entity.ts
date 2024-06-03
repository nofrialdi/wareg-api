import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderItem, OrderStatus } from '@prisma/client';

export class OrderEntity {
  id: string;

  @ApiProperty()
  @IsString()
  amount: number;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty()
  orderItems: OrderItem[];

  createdAt: Date;

  updatedAt: Date;
}
