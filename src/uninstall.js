import config from 'config';
import {Service} from 'node-mac';
import path from 'path';

// Create a new service object
const svc = new Service(Object.assign(
  {},
  config.get('service'),
  {script: path.join(__dirname, config.get('service.script'))}
));

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
  console.log('Uninstall complete.');
  console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();
