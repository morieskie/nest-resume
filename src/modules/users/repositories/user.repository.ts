import {
  DataSource,
  DeleteResult,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    console.log('DataSource initialized:', dataSource.isInitialized);
    super(User, dataSource.createEntityManager());
  }

  async createUser(attributes: CreateUserDto): Promise<{
    error: Error | null;
    data: User | undefined;
  }> {
    try {
      const response = await this.save(attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: undefined };
    }
  }

  async findUsers(
    criteria: any,
  ): Promise<{ error: Error | null; data: User[] | undefined }> {
    try {
      const response = await this.find({ where: { ...criteria } });
      return { error: null, data: response };
    } catch (error) {
      return { error, data: undefined };
    }
  }

  async findOneUser(
    id: string,
  ): Promise<{ error: Error | null; data: User | null }> {
    try {
      const response = await this.findOne(id as any);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: null };
    }
  }

  async updateUser(
    id: string,
    attributes: UpdateUserDto,
  ): Promise<{
    error: Error | null;
    data: UpdateResult | undefined;
  }> {
    try {
      const response = await this.update(id, attributes);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: undefined };
    }
  }

  async deleteUser(id: string): Promise<{
    error: Error | null;
    data: DeleteResult | undefined;
  }> {
    try {
      const response = await this.delete(id);
      return { error: null, data: response };
    } catch (error) {
      return { error, data: undefined };
    }
  }
}
