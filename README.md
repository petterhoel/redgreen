# TeamCityBuildScreen

This is a work in progress, not production ready.

## Angular CLI
You'll need angular cli installed globally or use npx. The following assumes running the Angular Cli.

<div class="extended-markdown note border rounded-1 mb-4 p-3 border-red bg-red-light">
<p>
<strong>Security caution:</strong> TeamCity uses Basic Authentication. For now this application will store username and passord in session storage as an encoded string and send along with every request. Beware, there are security footguns ahead. Here are some reccomendations though: </p>
  <ul>
    <li>Set up a read only user in TeamCity for this application.</li>
    <li>Serve the buildscreen over https only.</li>
    <li>If your build data contains or is considered sensitive information, don't have a build screen.</li>
  </ul>
</div>

## CORS (I can't log in or get data?)
Your TeamCity server must accept requests from where ever you host the buildscreen. Please check [their docs](https://confluence.jetbrains.com/display/TCD18/REST+API#RESTAPI-CORSSupport).


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running with docker
1. Build with `docker build .`
1. Note image hash, start with `docker run -d -p 8008:80 *hash* `
1. Find running container hash with `docker container ls`
1. And stop with `docker container stop *hash from ls*`
