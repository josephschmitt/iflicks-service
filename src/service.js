import config from 'config';
import express from "express";
import {scan, scanApps} from 'scan-downloads';

const app = express();
const port = config.get('server.port') || process.env.PORT;

app.get('/', function (req, res) {
  res.send('Running!');
});

app.get('/scan', async function (req, res) {
  try {
    const apps = Object.keys(config.get('scan-downloads')).join(',');
    const resp = await scanApps(apps);
    res.send(resp.join(' '));
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
});

app.get('/scan/:app', async function (req, res) {
  try {
    const resp = await scan(req.params.app);
    res.send(resp);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, function () {
  console.log("Listening on " + port);
});
