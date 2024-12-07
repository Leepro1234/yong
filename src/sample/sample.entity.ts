import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  myid: number
}
