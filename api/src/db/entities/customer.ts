import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { IMeasure } from '../../interfaces/uploadInterfaces'
import { Measure } from './measure';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    code: string;

    @OneToMany(() => Measure, measure => measure.customer)
    measures: IMeasure[];
}
