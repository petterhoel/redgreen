const fs = require('fs');
const filepath = './dist/TeamCityBuildScreen/config.json'
const commit = process.env.COMMIT_REF ? process.env.COMMIT_REF : 'not prod';

fs.readFile(filepath, 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
    const config = JSON.parse(data);
    config.version.commitRef = commit;
    config.sentry.use = true;
    json = JSON.stringify(config);
    fs.writeFile(filepath, json, 'utf8', () => console.log("Config file updated"));
}});
