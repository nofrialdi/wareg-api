import { Test, TestingModule } from '@nestjs/testing';
import { MenuImagesController } from './menu-images.controller';
import { MenuImagesService } from './menu-images.service';

describe('MenuImagesController', () => {
  let controller: MenuImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuImagesController],
      providers: [MenuImagesService],
    }).compile();

    controller = module.get<MenuImagesController>(MenuImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
