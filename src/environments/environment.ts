// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { userPool } from "src/credentials";

export const environment = {
  production: false,
  
  cognito: userPool,

  // For dev
  urlAPI: 'https://fn4cn7rdv3.execute-api.us-east-1.amazonaws.com/dev',
  redirectSignIn: 'http://localhost:4000/auth/sign',
  redirectSignOut: 'http://localhost:4000/auth/login',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
