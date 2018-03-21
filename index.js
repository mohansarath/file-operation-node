const yarg = require('yargs');
const fs=require('fs');
var options=yarg.argv.options;

console.log(options);

fs.writeFile('name.json', ' { "name" : [', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });   

if(options=='read'){

}
else if(options=='write'){
    console.log(yarg.argv._[0]);
    var name=yarg.argv._[0];
    fs.appendFile('name.json', '"'+name+'",', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}
else if(options=='remove'){
    
}

fs.appendFile('name.json', ']}', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });