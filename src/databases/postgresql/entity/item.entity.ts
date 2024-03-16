import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IItem from "../model/item.model";
import { Transform } from "class-transformer";

@Entity()
export class ItemEntity implements IItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Transform((value) => value.value)
  name!: string;

  @Column({ default: 0 })
  @Transform((value) => value.value)
  price!: number;

  @Column({ nullable: true })
  @Transform((value) => value.value)
  description!: string;

  @Column({ default: new Date().toDateString() })
  @Transform((value) => value.value)
  datePublished!: string;

  @Column({ nullable: true })
  @Transform((value) => value.value)
  image!: string;
}
