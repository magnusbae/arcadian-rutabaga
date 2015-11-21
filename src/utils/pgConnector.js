import pg from 'pg';

const DBURL = process.env.DATABASE_URL || 'postgres://localhost:5432/database_name';

class PostgresConnector {

  constructor(){
    pg.connect(DBURL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query('SELECT table_schema,table_name FROM information_schema.tables;')
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });
  }

}


export default new PostgresConnector();


/*
* DB-script
*
 CREATE ROLE user_name;
 ALTER ROLE user_name WITH LOGIN PASSWORD 'password' NOSUPERUSER NOCREATEDB NOCREATEROLE;
 CREATE DATABASE database_name OWNER user_name;
 REVOKE ALL ON DATABASE database_name FROM PUBLIC;
 GRANT CONNECT ON DATABASE database_name TO user_name;
 GRANT ALL ON DATABASE database_name TO user_name;
*
* */
