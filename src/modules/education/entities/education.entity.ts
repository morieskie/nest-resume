import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'education' })
export class Education {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @ObjectIdColumn()
  userId?: ObjectId;

  @Column()
  company: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  description: string;

  @Column('array')
  subjects: string[];

  @ManyToOne(() => User, (user) => user.id)
  user?: User;
}
