const yarg = require('yargs');
const fs = require('fs');
var options = yarg.argv.options;

// console.log(options);

var obj = {
    name: []
}
var i=1;
if (options == 'read') {
    var data = fs.readFileSync('name.json');
    existdata = JSON.parse(data.toString());
    console.log('.......Names.........');
    existdata.name.forEach(item => {
        console.log(i++ +' '+ item);
    });
}
else if (options == 'write') {
    // console.log(yarg.argv._[0]);
    var name = yarg.argv._[0];


    var existdata;
    var data = fs.readFileSync('name.json');
    existdata = JSON.parse(data.toString());
    // console.log('exist', existdata.name);
    // console.log('yoo', existdata);


    existdata.name.forEach(item => {
        obj["name"].push(item);
    });

    obj["name"].push(name);
    // console.log(JSON.stringify(obj));

    fs.writeFile('name.json', JSON.stringify(obj), function (err) {
        if (err) throw err;
        console.log('Saved ' + name);
    });
}
else if (options == 'remove') {
    var removename = yarg.argv._[0];
    var data = fs.readFileSync('name.json');
    existdata = JSON.parse(data.toString());
    var index= existdata.name.indexOf(removename)
    // console.log('index',index);
    if (index > -1) {
        existdata.name.splice(index, 1);
        console.log('Removed.........');
    }

    console.log('.......Names.........');
    existdata.name.forEach(item => {
        console.log(i++ +' '+ item);
    });

    fs.writeFile('name.json', JSON.stringify(existdata), function (err) {
        if (err) throw err;
        // console.log('Saved!');
    });

}

