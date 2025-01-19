import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repositories/project.repository';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('ProjectRepository') private repository: ProjectRepository,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    return this.repository.createProject(createProjectDto);
  }

  findAll(criteria: Partial<CreateProjectDto> = {}) {
    return this.repository.findProjects(criteria);
  }

  findOne(id: string) {
    return this.repository.findProject(id);
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.repository.updateProject(id, updateProjectDto);
  }

  remove(id: string) {
    return this.repository.deleteProject(id);
  }
}
