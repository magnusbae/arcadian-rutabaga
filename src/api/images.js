import { Router } from 'express';
import db from './../utils/pgConnector';

const router = new Router();

router.post("/", function (request, response) {
  var body = JSON.stringify(request.body);

  db
    .query("INSERT INTO images(data) values($1)", [body])
    .then(function(data){
      response.sendStatus(200);
      console.log(data.rowCount);
    })
    .then(function(err){
      console.log(err.stack);
      response.status(500).send(err);
    });

});

router.get('/', function (request, response){
  db
    .query("select id, \
      (data ->> 'timestamp') as timestamp from images")
    .then(function(data){
      response.json(data.rows);
    })
    .then(function(err){
      response.status(500).send(err);
    });
});

router.get('/:id', function (request, response) {
  db
    .query("select (data ->> 'image') as image from images where id = $1", [request.params.id])
    .then(function(data){

      const img = new Buffer(data.rows[0].image, 'base64');

      response.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img.length
      });

      response.end(img);
    })
    .then(function(err){
      response.status(404).send(err);
    });
});

router.delete('/:id', function(request, response){
  db
    .query("delete from images where id = $1", [request.params.id])
    .then(function(){
      response.sendStatus(200);
    })
    .then(function(err){
      response.status(404).send(err);
    });
});

export default router;
