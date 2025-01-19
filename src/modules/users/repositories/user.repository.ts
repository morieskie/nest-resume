import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectsService } from '../../projects/projects.service';
import { ExperienceService } from '../../experience/experience.service';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(ProjectsService) private projectService: ProjectsService,
    @Inject(ExperienceService) private experienceService: ExperienceService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(attributes: CreateUserDto): Promise<{
    error: Error | null;
    data: User | null;
  }> {
    try {
      const response = await this.save(attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findUsers(
    criteria: any = {},
  ): Promise<{ error: Error | null; data: User[] | null }> {
    try {
      const response = await this.find({ where: { ...criteria } });
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findOneUser(
    id: string,
  ): Promise<{ error: Error | null; data: User | null }> {
    try {
      const response = (await this.findOne(id as any)) as User;
      if (response && response.id) {
        const projectsResponse = await this.projectService.findAll({
          userId: response.id.toString(),
        });

        const experienceResponse = await this.experienceService.findAll({
          userId: response.id.toString(),
        });

        response.projects = projectsResponse.data as [];
        response.experience = experienceResponse.data as [];
      }

      return { error: null, data: response };
    } catch (error) {
      return { error: error.message, data: null };
    }
  }

  async updateUser(
    id: string,
    attributes: UpdateUserDto,
  ): Promise<{
    error: Error | null;
    data: UpdateResult | null;
  }> {
    try {
      const response = await this.update(id, attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async deleteUser(id: string): Promise<{
    error: Error | null;
    data: DeleteResult | null;
  }> {
    try {
      const response = await this.delete(id);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }
}
