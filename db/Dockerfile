FROM postgres:latest

ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

EXPOSE 5432

COPY ./init.sh /docker-entrypoint-initdb.d/

WORKDIR /var/lib/postgresql/data
