import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Customer } from './entities/customer'
import { Measure } from './entities/measure'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    subscribers: [ Customer, Measure ],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Postgres started!')
    })
    .catch((error) => console.log(error))
