import config from 'config';
import {exec} from 'child_process';
import express from "express";
import path from 'path';
import {scan, scanApps} from 'scan-downloads';

const app = express();
const port = config.get('server.port') || process.env.PORT;

app.get('/', function (req, res) {
  res.send('Running!');
});

app.get('/scan', async function (req, res) {
  const apps = Object.keys(config.get('scan-downloads')).join(',');
  const resp = await scanApps(apps);
  res.send(resp.join(' '));
});

app.get('/scan/:app', async function (req, res) {
  const resp = await scan(req.params.app);
  res.send(resp);
});

app.listen(port, function () {
  console.log("Listening on " + port);
});
