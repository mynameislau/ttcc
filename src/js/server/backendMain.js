import { startSocketServer } from './socketServer';
import express from 'express';

startSocketServer().then(() => {
  console.log('socket server started');

  var app = express();

  /*app.get('/', function (req, res) {
    res.send('Hello World!');
  });*/

  app.use(express.static('dev'));

  const httpPort = 4567;
  app.listen(httpPort, function () {
    console.log(`http server listening on port ! ${httpPort}`);
  });
});