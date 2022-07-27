import 'zone.js/node';

import webpush from 'web-push';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './main.server';
import { APP_BASE_HREF } from '@angular/common';
import router from '../server';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ng14swtest/browser');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // TODO: implement data requests securely
  // server.get('/api/**', (req, res) => {
  //   res.status(404).send('data requests are not yet supported');
  // });
  server.use('/api', router);

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index.html', {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const VAPIDPublicKey = process.env['VAPID_PUBLIC_KEY'];
  const VAPIDPrivateKey = process.env['VAPID_PRIVATE_KEY'];

  if (!VAPIDPublicKey || !VAPIDPrivateKey) {
    throw new Error('need web-push vapid keys');
  }

  webpush.setVapidDetails(
    'mailto:test@test.com',
    VAPIDPublicKey,
    VAPIDPrivateKey
  );

  const port = process.env['PORT'] || 8080;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './main.server';
