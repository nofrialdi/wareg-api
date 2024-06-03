import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getRatings(id: number): Promise<RatingsEntity | null> {
    return this.prisma.ratings.findUnique({
      where: {
        id,
      },
    });
  }

  async createRating(
    createRatingDto: CreateRatingDto,
    request: Request,
  ): Promise<RatingsEntity> {
    const { rating, menuId } = createRatingDto;
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token.');
    }
    const decodedToken = this.jwtService.decode(token) as { sub: number };
    const userId = decodedToken.sub;

    return this.prisma.ratings.create({
      data: {
        userId,
        menuId,
        rating,
      },
    });
  }

  async updateRating(
    id: number,
    data: UpdateRatingDto,
  ): Promise<RatingsEntity> {
    return this.prisma.ratings.update({ where: { id }, data });
  }

  async deleteRating(id: number): Promise<RatingsEntity> {
    return this.prisma.ratings.delete({ where: { id } });
  }
}
