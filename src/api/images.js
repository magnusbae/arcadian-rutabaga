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

//router.get('/', function (request, response){
//
//});

export default router;
