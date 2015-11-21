import pg from 'pg';

const DBURL = process.env.DATABASE_URL || 'postgres://localhost:5432/database_name';

class PostgresConnector {

  constructor(){
    pg.connect(DBURL, function(err, client, done) {
      if (err) throw err;

      pg.defaults.poolSize = 25;

      client
        .query('CREATE TABLE IF NOT EXISTS images( \
        id SERIAL PRIMARY KEY,\
        data JSONB\
        )')
        .on('row', function(row) {
          console.log(JSON.stringify(row));
          done();
        });
    });
  }

  query(queryString, values) {
    return new Promise(function (fulfill, reject){
      pg.connect(DBURL, function(err, client, done){
        client.query(queryString, values, function(err, result){
          done();
          if(err){
            reject(err);
          }else{
            fulfill(result);
          }
        });
      })
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
*
* CREATE INDEX idx_images ON images USING GIN(data jsonb_path_ops);
* */
