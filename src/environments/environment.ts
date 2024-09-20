// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const ApiUrl = "https://localhost:7283";
const ApiUrl = "http://semanticwebapi-dev.eba-ndy8ps9y.us-east-1.elasticbeanstalk.com";
const ServerDomain = "http://semanticwebapi-dev.eba-ndy8ps9y.us-east-1.elasticbeanstalk.com";
export const base = "/"
export const environment = {
  production: false,
  apiUrl: ApiUrl,
  serverDomain: ServerDomain,
  base: base
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
