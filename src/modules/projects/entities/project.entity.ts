import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @ObjectIdColumn()
  id?: ObjectId;

  @ObjectIdColumn()
  userId?: ObjectId;

  @Column()
  project: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  imgUrl: string;

  @Column()
  altTitle?: string;

  @Column('array')
  categories: string[];

  @Column('array')
  technologies: string[];

  @Column()
  url?: string;

  @Column()
  date?: string;

  @Column('array')
  images: string[];

  @ManyToOne(() => User, (user: User) => user.projects)
  user?: User;
}
