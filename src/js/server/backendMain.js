import { startSocketServer } from './socketServer';
import express from 'express';
import path from 'path';

console.log('socket server started');

var app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dev/index.html'));
// });

app.get('/config/', (req, res) => {
  res.send(JSON.stringify({
    port: app.get('port')
  }));
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static('dev'));

app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));

startSocketServer(app);