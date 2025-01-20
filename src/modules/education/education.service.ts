import { Injectable, Inject } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { EducationRepository } from './repositories/education.repository';

@Injectable()
export class EducationService {
  constructor(
    @Inject('EducationRepository') private repository: EducationRepository,
  ) {}
  create(createEducationDto: CreateEducationDto) {
    return this.repository.createEducation(createEducationDto);
  }

  findAll(criteria: UpdateEducationDto = {}) {
    return this.repository.findEducation({ ...criteria });
  }

  findOne(id: string) {
    return this.repository.findOneEducation(id);
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    return this.repository.updateEducation(id, updateEducationDto);
  }

  remove(id: string) {
    return this.repository.deleteEducation(id);
  }
}
