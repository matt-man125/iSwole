import express from 'express';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import configRoutes from './routes/index.js';

const app = express();

app.use(express.static('static')); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

const staticDir = express.static(__dirname + '/public')
app.use(staticDir);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});