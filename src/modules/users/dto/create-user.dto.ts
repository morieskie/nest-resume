import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Matches,
  ValidateNested,
} from 'class-validator';

class SocialLink {
  @IsNotEmpty()
  firm: string;
  @IsNotEmpty()
  url: string;
}

class Name {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Name)
  name: Name;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  @Matches(/^\d{4}[-/]\d{2}[-/]\d{2}$|^\d{2}[-/]\d{2}[-/]\d{4}$/, {
    message:
      'dob must be in formats like DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, or YYYY/MM/DD',
  })
  dob?: string;
  address: string;
  @IsPhoneNumber()
  mobileNumber?: string;
  imageSrc: string;
  bio: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLink)
  socialLinks?: Array<SocialLink>;
}
