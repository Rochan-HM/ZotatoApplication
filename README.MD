# Zotato Application

This is the Zotato mobile application. Please note that an active server with a valid database connection is required for running the application.


# Installation and Running

This application is built using React Native and Expo.

## Steps
1. First, download the Expo Go Application from the Play Store / App Store.
2. Play Store: https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www
3. App Store: https://itunes.apple.com/app/apple-store/id982107779
4. Then, install the required dependencies using `npm install` or `yarn`.
5. Optionally, update the URL of the server in `src/api/api.js` in the `baseURL` field. By default, it is set to the public server running at https://cs4261project.herokuapp.com
6. Then, run `npm run start` or `yarn start` depending on your package manager.
7. Expo should start running. When the Web UI for Expo opens, choose `Tunnel` or `Local`. Please note that `Local` might not work on Enterprise Networks.
8. If on Android, scan the QR code using the Expo App.
9. If on iOS, scan the QR code using the Camera App.
10. The application should now start running on the device. 