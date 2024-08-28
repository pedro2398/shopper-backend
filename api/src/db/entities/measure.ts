import { ICustomer } from '../../interfaces/uploadInterfaces';
import { PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Customer } from './customer';

export class Measure {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    uuid: string;

    @Column({ type: 'timestamp' })
    datetime: Date;

    @Column({ type: 'text' })
    type: string;

    @Column({ type: 'boolean', default: false })
    confirmed: boolean;

    @Column({ type: 'text' })
    image: string;

    @Column({ type: 'text' })
    customerCode: string;

    @ManyToOne(() => Customer, customer => customer.measures)
    customer: ICustomer;
}
