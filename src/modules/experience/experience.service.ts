import { Injectable, Inject } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ExperienceRepository } from './repositories/experience.repository';

@Injectable()
export class ExperienceService {
  constructor(
    @Inject('ExperienceRepository') private repository: ExperienceRepository,
  ) {}
  create(createExperienceDto: CreateExperienceDto) {
    return this.repository.createExperience(createExperienceDto);
  }

  findAll(criteria: UpdateExperienceDto = {}) {
    return this.repository.findExperiences({ ...criteria });
  }

  findOne(id: string) {
    return this.repository.findOneExperience(id);
  }

  update(id: string, updateExperienceDto: UpdateExperienceDto) {
    return this.repository.updateExperience(id, updateExperienceDto);
  }

  remove(id: string) {
    return this.repository.deleteExperience(id);
  }
}
