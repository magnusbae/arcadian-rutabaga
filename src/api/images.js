import { Router } from 'express';

const router = new Router();

router.post("/", function (request, response) {
  response.sendStatus(200);
});

export default router;
