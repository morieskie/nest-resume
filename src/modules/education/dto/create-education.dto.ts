import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  company: string;
  @IsString()
  @IsNotEmpty()
  from: string;
  @IsString()
  @IsNotEmpty()
  to: string;
  @IsString()
  description: string;
  @IsString({ each: true })
  subjects?: string[];
}
