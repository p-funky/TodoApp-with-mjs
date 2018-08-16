import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.get('*', (req, res) => res.status(200).send({
  message: 'We are home!!!',
}));

export default app;
