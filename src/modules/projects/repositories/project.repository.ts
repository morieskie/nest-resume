import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

export class ProjectRepository extends Repository<Project> {
  constructor(private readonly dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(attributes: CreateProjectDto): Promise<{
    error: Error | null;
    data: Project | null;
  }> {
    try {
      const response = await this.save(attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findProjects(
    criteria: Partial<CreateProjectDto> = {},
  ): Promise<{ error: Error | null; data: Project[] | [] }> {
    try {
      const response = await this.find({ where: { ...criteria } as any });
      return { error: null, data: response };
    } catch (error) {
      return { error, data: [] };
    }
  }

  async findProject(
    id: string,
  ): Promise<{ error: Error | null; data: Project | null }> {
    try {
      const response = await this.findOne(id as any);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async updateProject(
    id: string,
    attributes: UpdateProjectDto,
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

  async deleteProject(id: string): Promise<{
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
