import config from 'config';
import {Service} from 'node-mac';
import path from 'path';

const baseConfig = config.util.loadFileConfigs(path.join(process.env.PWD, 'config'))

const svcConfig = config.get('service');
const svc = new Service(Object.assign(
  {
    env: { // Pass config to the service via NODE_CONFIG environment variable
      name: 'NODE_CONFIG',
      value: JSON.stringify(baseConfig)
    }
  },
  svcConfig,
  {script: path.join(__dirname, config.get('service.script'))}
));

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log('\nInstallation Complete\n---------------------');
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
  console.log('Attempting to start it.');
  svc.start();
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name + ' started!');
});

// Install the script as a service.
svc.install();
