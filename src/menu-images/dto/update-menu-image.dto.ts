import { PartialType } from '@nestjs/swagger';
import { CreateMenuImagesDto } from './create-menu-image.dto';

export class UpdateMenuImageDto extends PartialType(CreateMenuImagesDto) {}
