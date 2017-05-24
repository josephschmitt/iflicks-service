# Node API service to communicate with the iFlicks Mac app.

The [iFlicks Mac app](http://iflicksapp.com), while great at many things, is unfortunately hampered
by macOS app sandboxing. While a very many things can be automated from the application in response
to many events, when it comes to dealing with the files at the end, the app sandbox lets you do very
little, even via Applescript. This Node web service attemps to help bridge that gap, providing API
endpoints that the iFlicks app can `cURL` to so that additional automated processing can be done on
your files.

## Configuration

Configuration is done via the `config/default.json` file. The `service` key has properties for
configuring the Mac service that can be started or stopped. The `scan-downloads` key has properties
for configuring the scanners. More can be read about that at the
[scan-downloads](https://github.com/josephschmitt/scan-downloads) project.

## API Services

`/scan`
Triggers a completed downloads scan using my
[scan-downloads](https://github.com/josephschmitt/scan-downloads) script. Works with
[Couch Potato](http://couchpota.to), [Sonarr](http://sonarr.tv), and [Radarr](http://radarr.video).

`/scan/:app`
Triggers the completion scan for a single app instead of all of them.

## Background Service

If you want to make sure the Node server is always up and running in the background, you can run the
`npm run start` script to start the server as a macOS background service. This will make sure the
server is always up and running, and re-start it if it crashes. To kill it, just run `npm run stop`.
More information on how the macOS service works can be found at the
[node-mac](https://github.com/coreybutler/node-mac) project.
