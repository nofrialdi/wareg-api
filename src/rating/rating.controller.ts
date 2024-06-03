import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RatingsEntity } from './entities/rating.entity';
import { RolesGuard } from 'src/auth/role-guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('rating')
@ApiTags('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiBearerAuth()
  create(
    @Body() createRatingDto: CreateRatingDto,
    @Req() request: Request,
  ): Promise<RatingsEntity> {
    {
      return this.ratingService.createRating(createRatingDto, request);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ratingService.getRatings(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.updateRating(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ratingService.deleteRating(id);
  }
}
