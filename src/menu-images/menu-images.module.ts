import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MenuImagesService } from './menu-images.service';
import { MenuImagesController } from './menu-images.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MenuImagesController],
  providers: [MenuImagesService],
})
export class MenuImagesModule {}
