const fs = require('fs');

const filepath = './dist/TeamCityBuildScreen/config.json'
const commit = process.env.COMMIT_REF ? process.env.COMMIT_REF : 'not prod';
fs.readFile(filepath, 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  const config = JSON.parse(data); //now it an object
  config.version.commitRef = commit; //add some data
  json = JSON.stringify(config); //convert it back to json
  fs.writeFile(filepath, json, 'utf8', ()=>console.log("Config file updated.")); // write it back
}});
