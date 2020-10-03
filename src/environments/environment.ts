// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //serverUrl:  location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'http://localhost:8096/' : 'http://18.204.34.8:8096/',
  //imagesUrl: location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'http://localhost:8096//serveImage/' : 'http://18.204.34.8:8096/serveImage/',
  serverUrl: 'http://localhost:8099/',
  imagesUrl: 'http://localhost:8099/serveImage/',
  defaultImage: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


