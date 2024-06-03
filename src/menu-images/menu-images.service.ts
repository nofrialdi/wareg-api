import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuImages } from '@prisma/client';
import { CreateMenuImagesDto } from './dto/create-menu-image.dto';
import { UpdateMenuImageDto } from './dto/update-menu-image.dto';
@Injectable()
export class MenuImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuImages(menuId: number): Promise<MenuImages | null> {
    return this.prisma.menuImages.findUnique({
      where: {
        menuId,
      },
    });
  }
  async create(createMenuImagesDto: CreateMenuImagesDto): Promise<MenuImages> {
    const createdMenuImage = await this.prisma.menuImages.create({
      data: createMenuImagesDto,
    });
    return createdMenuImage;
  }

  async updateMenuImages(
    menuId: number,
    data: UpdateMenuImageDto,
  ): Promise<MenuImages | null> {
    return this.prisma.menuImages.update({
      where: {
        menuId,
      },
      data,
    });
  }

  async deleteMenuImages(menuId: number): Promise<MenuImages | null> {
    return this.prisma.menuImages.delete({
      where: {
        menuId,
      },
    });
  }
}
