# TeamCity buildscreen
This is a work in progress, it is **_not considered stable_** yet. The aim is to provide a clean visual interface for statuses of builds on TeamCity servers along with build meta information. This is a personal hobby effort. There are no deadlines.

## First: Notes on security
Beware, there are some security footguns ahead. TeamCity uses _Basic Authentication_. So this application stores username and passord in session storage as an encoded string and sends it along with every request. Here are some reccomendations though:
- Set up a read only user in TeamCity for this buildscreen.
- Serve the buildscreen over https only to provide encryption. As mentioned _Basic Authentication_ requires us to send username and password along with every request as a plaintext base64 encoded string. 
- If your build data contains or is considered sensitive information, don't have a build screen.

## Features
- [x] List latest completed builds with meta infomation.
- [x] Fits narrow viewports and can sneak into busy info screens.
- [x] Filter which builds to display.
- [x] Error tracking using [sentry ](https://sentry.io/) with their standard sensitive data scrubbing.


## Todo
- [ ] Error visualization
    - Login
    - Endpoint dosent exist
    - Is not a TC server
    - CORS
- [ ] PWAify
    - Installable (manifest, icons etc)
    - Cache static assets

## Nice to have
- [ ] Running builds indicator.
- [ ] Multiple server support (remember by localhost and easy to swap).

## What the Config?
- `sentry.dsn` is a sentry spesific url used to post errors to sentry.io. Defaults to Petter's sentry setup.
- `sentry.use` change to `false` if you want to stop communicating to sentry (please don't 🙏). Defaults to `true`
- `version.commitRef` reference to latest git commit. Update `dist/TeamCityBuildScreen/config.json` by running `npm run netlifybuild` or `node buildscript/write-config.js` as part of your CI/CD process. Defaults to `"not prod"`.
```
{
  "sentry": {
    "dsn": "https://key@sentry.io/number",
    "use": true
  },
  "version": {
    "commitRef":"git hash/not prod"
  }
}

```

## Can't log in or get data? (CORS)
Your TeamCity server must accept requests from where ever you host the buildscreen. Please check [TeamCity docs](https://confluence.jetbrains.com/display/TCD18/REST+API#RESTAPI-CORSSupport) on how to do this.

## Hosted version [![Netlify Status](https://api.netlify.com/api/v1/badges/ad6c1e2f-621d-4c6d-b9e8-77ee005f8294/deploy-status)](https://app.netlify.com/sites/buildscreen/deploys)
Yes we are live on [netlify](https://buildscreen.netlify.com/).

## Development
This is a project written in Angular.

### Angular CLI
You'll need Angular cli installed globally or you can use npx if you don't like global installs. The following assumes running the Angular cli.

### Development server
Run `ng serve` for a dev server. Navigate to [localhost:4200](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/<ProjectName>` directory. Use the `--prod` flag for a production build.

## Running with docker
1. Build with `docker build .`.
1. Note image hash, start with `docker run -d -p 8008:80 *hash* `.
1. Find running container hash with `docker container ls`.
1. And stop with `docker container stop *hash from ls*`.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors
* **Petter Hoel** - [petterhoel](https://github.com/petterhoel/)
* [chhenni](https://github.com/chhenni)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details