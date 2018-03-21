const fs = require('fs');
const yargs = require('yargs');

const option = yargs.argv.option || null;
const name = yargs.argv.name || null;
const file = 'newName.json';


const fetchData = () => {
    if (!fs.existsSync(file)) {
        throw new Error('File not found');
    }
    return JSON.parse(fs.readFileSync(file).toString());
};

const writeData = (data, cb) => {
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) cb(err);
        cb(null);
    });
};

const printData = (data) => {
    for (let index = 0; index < data.length; index++) {
        console.log(index + 1 + '.' + data[index]);
    }
};

switch (option) {
    case 'read':
        const data = fetchData();
        printData(data);
        break;
    case 'write':
        if (!name) {
            throw new Error('Name not found');
        }
        const users = fetchData();
        users.push(name);

        writeData(users, (err) => {
            if (err) throw new Error('Something wrong with write');

            console.log('New item added: ' + name);
        })

        break;
    default:
        console.log('\nInvalid Option');
        break;
}