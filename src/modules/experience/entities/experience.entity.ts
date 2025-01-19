import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'experiences' })
export class Experience {
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
  role: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  user?: User;
}
