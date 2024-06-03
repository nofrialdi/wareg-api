import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, Order } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { OrderEntity } from './entities/order.entity';
import { Request } from 'express';
import { OrderItem } from './dto/order-item.dto';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    request: Request,
  ): Promise<OrderEntity> {
    const { orderItems } = createOrderDto;

    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token.');
    }
    const decodedToken = this.jwtService.decode(token) as {
      sub: number;
      role: Role;
    };
    const userId = decodedToken.sub;

    const totalAmount = await this.calculateTotalAmount(orderItems);
    const createdOrder = await this.prismaService.order.create({
      data: {
        userId,
        amount: totalAmount,
        orderItems: {
          create: this.createOrderItemsData(orderItems),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return createdOrder;
  }

  async calculateTotalAmount(orderItems: OrderItem[]): Promise<number> {
    let totalAmount = 0;
    for (const orderItem of orderItems) {
      const { menuId, quantity } = orderItem;
      const menu = await this.prismaService.menu.findUnique({
        where: { id: menuId },
      });
      if (!menu) {
        throw new NotFoundException(`Menu with ID ${menuId} not found.`);
      }
      const amount = quantity * menu.price;
      totalAmount += amount;
    }
    return totalAmount;
  }

  createOrderItemsData(
    orderItems: OrderItem[],
  ): { menuId: number; quantity: number }[] {
    return orderItems.map((orderItem) => ({
      menuId: orderItem.menuId,
      quantity: orderItem.quantity,
    }));
  }
  async findAll() {
    return await this.prismaService.order.findMany({
      select: {
        id: true,
        amount: true,
        orderItems: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.order.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        orderItems: true,
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { orderItems } = updateOrderDto;

    const updateOrderItemsData = orderItems.map((item) => ({
      where: { id: item.id },
      data: { quantity: item.quantity },
    }));

    const updatedOrder = await this.prismaService.order.update({
      where: { id },
      data: {
        orderItems: {
          updateMany: updateOrderItemsData,
        },
      },
      include: { orderItems: true },
    });

    return updatedOrder;
  }
  async delete(id: string): Promise<void> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    await this.prismaService.orderItem.deleteMany({
      where: { orderId: id },
    });

    await this.prismaService.order.delete({
      where: { id },
    });
    // await this.prismaService.orderItem.deleteMany({
    //   where: { orderId: id },
    // });

    // await this.prismaService.order.delete({
    //   where: { id },
    // });
  }

  async removeOrders(id: string) {
    // return this.prismaService.order.delete({
    //   where: { id },
    //   include: { orderItems: true },
    // });

    await this.prismaService.orderItem.deleteMany({
      where: { orderId: id },
    });

    await this.prismaService.order.delete({
      where: { id },
    });
  }

  async removeOrderItem(orderItemId: string): Promise<void> {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { id: orderItemId },
      select: { orderId: true },
    });

    if (!orderItem) {
      throw new NotFoundException('Order item not found.');
    }

    const order = await this.prismaService.order.findUnique({
      where: { id: orderItem.orderId },
      select: { userId: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    await this.prismaService.orderItem.delete({
      where: { id: orderItemId },
    });
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    userRole: Role,
  ): Promise<Order> {
    if (userRole !== Role.ADMIN) {
      throw new UnauthorizedException('Only admins can update order status.');
    }
    const order = await this.prismaService.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return this.prismaService.order.update({
      where: { id },
      data: updateOrderStatusDto,
      include: { orderItems: true },
    });
  }
}
