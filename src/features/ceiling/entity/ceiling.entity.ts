import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CeilingPerf } from '../../ceiling-perf/entity/ceiling-perf.entity';

@Entity()
export class Ceiling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  reference: string;

  @Column()
  price: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @OneToMany(() => CeilingPerf, (perf) => perf.ceiling)
  performces?: CeilingPerf[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
