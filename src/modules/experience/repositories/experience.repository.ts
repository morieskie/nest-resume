import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { Experience } from '../entities/experience.entity';

export class ExperienceRepository extends Repository<Experience> {
  constructor(private readonly dataSource: DataSource) {
    super(Experience, dataSource.createEntityManager());
  }
  async createExperience(attributes: CreateExperienceDto): Promise<{
    error: Error | null;
    data: Experience | null;
  }> {
    try {
      const response = await this.save(attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findExperiences(
    criteria: any,
  ): Promise<{ error: Error | null; data: Experience[] | null}> {
    try {
      const response = await this.find({ where: { ...criteria } });
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findOneExperience(
    id: string,
  ): Promise<{ error: Error | null; data: Experience | null }> {
    try {
      const response = await this.findOne(id as any);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async updateExperience(
    id: string,
    attributes: UpdateExperienceDto,
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

  async deleteExperience(id: string): Promise<{
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
