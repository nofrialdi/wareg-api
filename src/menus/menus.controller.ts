import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/role-guard';
import { Role, Menu } from '@prisma/client';
import { MenuEntity } from './entities/menu.entity';
import {
  ApiTags,
  ApiOkResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryMenu } from './dto/query-menu.dto';

@Controller('menus')
@ApiTags('Menus')
export class MenuController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: [QueryMenu], description: 'A list of menus' })
  async getAllMenus(
    @Query('q') query?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<{
    items: QueryMenu[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.menusService.getAllMenus(query, Number(page), Number(limit));
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'menu created successfully',
    type: MenuEntity,
  })
  createMenu(
    @Body() createMenuDto: CreateMenuDto,
    @Req() request: Request,
  ): Promise<MenuEntity> {
    return this.menusService.createMenu(createMenuDto, request);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Menu updated successfully',
    type: MenuEntity,
  })
  updateMenu(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<MenuEntity> {
    return this.menusService.updateMenu(+id, updateMenuDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Menu deleted successfully',
    type: MenuEntity,
  })
  deleteMenu(@Param('id') id: number): Promise<Menu> {
    return this.menusService.deleteMenu(+id);
  }
}
