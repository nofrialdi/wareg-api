import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuImagesService } from './menu-images.service';
import { CreateMenuImagesDto } from './dto/create-menu-image.dto';
import { UpdateMenuImageDto } from './dto/update-menu-image.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('menu-images')
@ApiTags('Menu-images')
export class MenuImagesController {
  constructor(private readonly menuImagesService: MenuImagesService) {}

  @Post()
  create(@Body() createMenuImageDto: CreateMenuImagesDto) {
    return this.menuImagesService.create(createMenuImageDto);
  }

  @Get(':menuId')
  findOne(@Param('menuId') menuId: number) {
    return this.menuImagesService.getMenuImages(menuId);
  }

  @Patch(':menuId')
  update(
    @Param('menuId') menuId: number,
    @Body() updateMenuImageDto: UpdateMenuImageDto,
  ) {
    return this.menuImagesService.updateMenuImages(menuId, updateMenuImageDto);
  }

  @Delete(':menuId')
  remove(@Param('menuId') menuId: number) {
    return this.menuImagesService.deleteMenuImages(menuId);
  }
}
