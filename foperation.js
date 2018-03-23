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

const removeData = (data, index) => {
    data.splice(index, 1);
    // console.log('data',data);
    return data;
}
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
    case 'remove':
        if (!name) {
            throw new Error('Name not found');
        }
        const usersr = fetchData();
        const index = usersr.indexOf(name);
        if (index == -1)
            console.log('Name not found');
        else {
            const newusers = removeData(usersr, index);
            // console.log(newusers);
            // writeData(newusers, (err) => {
            //     if (err) throw new Error('Something wrong with remove');

            //     console.log(' item removed: ' + name);
            // })


            const write = fs.writeFileSync(file, JSON.stringify(newusers));
            console.log(' item removed: ' + name);
            const usersn=fetchData();
            printData(usersn);
        }
        break;
    default:
        console.log('\nInvalid Option');
        break;
}