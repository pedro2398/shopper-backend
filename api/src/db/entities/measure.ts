import { PrimaryGeneratedColumn, Column, ManyToOne, Entity} from 'typeorm';

@Entity()
export class Measure {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text', unique: true })
    measure_uuid: string;

    @Column({ type: 'timestamp' })
    measure_datetime: Date;

    @Column({ type: 'text' })
    measure_type: string;

    @Column({ type: 'boolean', default: false })
    has_confirmed: boolean;

    @Column({ type: 'text' })
    image_url: string;

    @Column({ type: 'text' })
    customer_code: string;
}
