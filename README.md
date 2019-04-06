# TeamCity buildscreen
This is a work in progress, it is *not production ready*. The aim is to provide a clean visual interface for statuses of builds on TeamCity servers along with build meta information.

## Notes on security
Beware, there are some security footguns ahead. TeamCity uses Basic Authentication. For now this application will store username and passord in session storage as an encoded string and send it along with every request. Here are some reccomendations though:
- Set up a read only user in TeamCity for this application.
- Serve the buildscreen over https only.
- If your build data contains or is considered sensitive information, don't have a build screen.

## Features
- [x] List latest completed builds with meta infomation.
- [x] Fits narrow viewports and can sneak into busy info screens.

## Todo
- [ ] Filter build list (toggle which builds to display - sticky by localstorage)
- [ ] PWAify
    - Cache fonts
    - Installable

## Nice to have
- [ ] Running builds indicator.
- [ ] Error tracking (sanity?).
- [ ] Multiple server support (remember and easy to swap).

## CORS (I can't log in or get data?)
Your TeamCity server must accept requests from where ever you host the buildscreen. Please check [their docs](https://confluence.jetbrains.com/display/TCD18/REST+API#RESTAPI-CORSSupport).

## Hosted version [![Netlify Status](https://api.netlify.com/api/v1/badges/ad6c1e2f-621d-4c6d-b9e8-77ee005f8294/deploy-status)](https://app.netlify.com/sites/buildscreen/deploys)
Yes we are live on [netlify](https://buildscreen.netlify.com/)

## Development

### Angular CLI
You'll need angular cli installed globally or use npx. The following assumes running the angular cli.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/<ProjectName>` directory. Use the `--prod` flag for a production build.

## Running with docker
1. Build with `docker build .`
1. Note image hash, start with `docker run -d -p 8008:80 *hash* `
1. Find running container hash with `docker container ls`
1. And stop with `docker container stop *hash from ls*`
