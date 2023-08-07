import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  version: number;
  @Column()
  createdAt: number;
  @Column()
  updatedAt: number;
  @Column()
  @Exclude()
  password: string;

  constructor(createUserDto: Partial<CreateUserDto>) {
    const timestamp = Date.now();
    this.id = uuidv4();
    this.login = createUserDto?.login;
    this.password = createUserDto?.password;
    this.version = 1;
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
