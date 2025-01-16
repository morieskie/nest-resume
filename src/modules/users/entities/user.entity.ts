import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn({ name: '_id' })
  id: ObjectId;

  @Column('json')
  name: {
    firstName: string;
    lastName: string;
  };

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  address: string;

  @Column()
  mobileNumber: string;

  @Column()
  imageSrc: string;

  @Column()
  bio: string;

  @Column('array')
  socialLinks: {
    firm: string;
    url: string;
  }[];
}
