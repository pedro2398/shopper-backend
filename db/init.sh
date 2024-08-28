#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS customer (
        id SERIAL PRIMARY KEY,
        code TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS measures (
        id SERIAL PRIMARY KEY,
        uuid TEXT NOT NULL UNIQUE, 
        datetime TIMESTAMP NOT NULL,
        type TEXT NOT NULL,
        confirmed BOOLEAN DEFAULT FALSE,
        image TEXT NOT NULL,
        customer_code TEXT NOT NULL,    
        FOREIGN KEY (customer_code) REFERENCES customer(code)
        );
EOSQL
