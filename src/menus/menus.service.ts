import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
import { JwtService } from '@nestjs/jwt';
import { QueryMenu } from './dto/query-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllMenus(
    query?: string,
    page = 1,
    limit = 10,
  ): Promise<{
    items: QueryMenu[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;
    const items = await this.prisma.menu.findMany({
      where: {
        name: { contains: query || '' },
      },
      skip: skip,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        ratings: {
          select: {
            rating: true,
          },
        },
        menuImages: {
          select: {
            img1: true,
            img2: true,
            img3: true,
            img4: true,
          },
        },
      },
    });
    const total = await this.prisma.menu.count({
      where: {
        name: { contains: query || '' },
      },
    });

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async createMenu(
    createMenuDto: CreateMenuDto,
    request: Request,
  ): Promise<MenuEntity> {
    const { name, price, categoryId, calories, description } = createMenuDto;
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token.');
    }
    const decodedToken = this.jwtService.decode(token) as { sub: number };
    const userId = decodedToken.sub;

    return this.prisma.menu.create({
      data: {
        name,
        price,
        categoryId,
        userId,
        calories,
        description,
      },
      include: { category: true, user: true },
    });
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    const { name, price, categoryId, calories, description } = updateMenuDto;
    return this.prisma.menu.update({
      where: { id },
      data: {
        name,
        price,
        categoryId,
        calories,
        description,
      },
    });
  }

  async deleteMenu(id: number): Promise<MenuEntity | null> {
    return this.prisma.menu.delete({ where: { id } });
  }
}
