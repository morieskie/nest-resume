import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Education } from '../entities/education.entity';
import { CreateEducationDto } from '../dto/create-education.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';
import { Inject } from '@nestjs/common';

export class EducationRepository extends Repository<Education> {
  constructor(@Inject(DataSource) private dataSource: DataSource) {
    super(Education, dataSource.createEntityManager());
  }

  async createEducation(attributes: CreateEducationDto): Promise<{
    error: Error | null;
    data: Education | null;
  }> {
    try {
      const response = await this.save(attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findEducation(
    criteria: any,
  ): Promise<{ error: Error | null; data: Education[] | null }> {
    try {
      const response = await this.find({ where: { ...criteria } });
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async findOneEducation(
    id: string,
  ): Promise<{ error: Error | null; data: Education | null }> {
    try {
      const response = await this.findOne(id as any);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async updateEducation(
    id: string,
    attributes: UpdateEducationDto,
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

  async deleteEducation(id: string): Promise<{
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
