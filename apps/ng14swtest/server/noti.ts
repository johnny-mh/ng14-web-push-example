import { Router } from 'express';
import webpush from 'web-push';

const router = Router();

router.get('/', (_, res) => {
  res.send({ hello: 'world' }).end();
});

router.post('/', (req, res) => {
  console.log(req.body);

  setTimeout(() => {
    webpush
      .sendNotification(
        req.body.sub,
        JSON.stringify({ title: 'hello', body: 'world' })
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 5000);

  res.end();
});

export default router;
