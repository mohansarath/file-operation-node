const yarg = require('yargs');
const fs = require('fs');


var options = yarg.argv.options;
var i = 1;

if (options == 'read') {
    if (!fs.existsSync('name.json')) {
        console.log("....File not found......");
    }
    else {
        var data = fs.readFileSync('name.json');
        existdata = JSON.parse(data.toString());
        console.log('.......Names.........\n');
        existdata.name.forEach(item => {
            console.log(i++ + ' ' + item);
        });
        console.log('\n...............');
    }
}

else if (options == 'write') {
    // console.log(yarg.argv._[0]);
    var name = yarg.argv._[0];

    if (!name) {
        console.log('\nPlease provide name to add');
    }
    else {
        if (!fs.existsSync('name.json')) {
            console.log("....File not found......");
        }
        else {
            var data = fs.readFileSync('name.json');
            var existdata = JSON.parse(data.toString());
            existdata.name.push(name);
            fs.writeFile('name.json', JSON.stringify(existdata), function (err) {
                if (err) throw err;
                console.log('\nSaved ' + name + '\n');
            });
        }
    }
}

else if (options == 'remove') {
    var removename = yarg.argv._[0];
    if (!removename) {
        console.log('\nPlease provide name to remove');
    }
    else {
        if (!fs.existsSync('name.json')) {
            console.log("....File not found......");
        }
        else {
            var data = fs.readFileSync('name.json');
            existdata = JSON.parse(data.toString());
            var index = existdata.name.indexOf(removename)
            if (index > -1) {
                existdata.name.splice(index, 1);
                console.log('\nRemoved ' + removename);
            }
            else {
                console.log('\n Cannot Find ' + removename)
            }

            console.log('\n.......Names.........\n');
            existdata.name.forEach(item => {
                console.log(i++ + ' ' + item);
            });
            console.log('\n...............');
            fs.writeFile('name.json', JSON.stringify(existdata), function (err) {
                if (err) throw err;
            });
        }
    }
}
else {
    console.log('\nInvalid Option');
}

