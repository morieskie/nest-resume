import {
  IsMongoId,
  isMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { isValidObjectId, ObjectId } from 'mongoose';

export class CreateProjectDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  project: string;
  @IsString()
  @IsNotEmpty()
  description?: string;
  @IsString()
  @IsNotEmpty()
  imgUrl: string;
  @IsString()
  altTitle?: string;
  @IsString({ each: true })
  @IsNotEmpty()
  categories: string[];
  @IsString({ each: true })
  @IsNotEmpty()
  technologies: string[];
  @IsString()
  url?: string;
  @IsString()
  date?: string;
  @IsString({ each: true })
  @IsNotEmpty()
  images: string[];
}
