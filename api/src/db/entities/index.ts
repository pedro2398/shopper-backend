import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm';

@Entity('measures')
export class Measure {
    @PrimaryGeneratedColumn('uuid')
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

    @Column({ type: 'text' })
    measure_value: number;
}
