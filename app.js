// MODULES//

// const {sayHello} = require('./helper');
//
// sayHello();

//GLOBAL VARIABLES//
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());

// console.log(process);

//PATH//
// const path = require('path');

// const joinedPath = path.join(__dirname, 'test', 'text.txt');
// console.log(joinedPath);

// const normalizedPath = path.normalize('//////test/////test2///test.txt');
// console.log(normalizedPath);

// const resolvedPath = path.resolve('test', 'test2', 'text.txt');
// console.log(resolvedPath);


//OS//

// const os = require('os');

// console.log(os.arch());
// console.log(os.cpus());

//FS//

const fs = require('fs');
const path = require('path');

// fs.readFile('test/text.txt', (err, data) => {
// if (err) throw new Error();
//     console.log(data);
// })
// fs.writeFile(path.join('test', 'text2.txt'), 'hello from Okten!!!', (err) => {
//     if (err) throw new Error(err.message)
// })
// fs.readFile(path.join(__dirname, 'test', 'text.txt'), (err, data) => {
//     if (err) throw new Error();
//     console.log(data.toString());
// })

// fs.appendFile(path.join('test', 'text2.txt'), '\nHello from Okten again!!!', (err)=>{
//     if (err) throw new Error()
// })

// fs.truncate(path.join('test', 'text2.txt'), (err)=>{
//     if(err) throw new Error()
// })

// fs.unlink(path.join('test', 'text2.txt'), (err)=>{
//     if (err) throw new  Error()
// })

// fs.readdir(path.join('test'), (err, data)=>{
//     if(err) throw new Error()
//     console.log(data);
// })

// fs.stat(path.join('test'), (err, stats)=>{
//     if(err) throw new Error()
//     console.log(stats.isDirectory());
//     console.log(stats.isFile());
// })

// fs.readdir(path.join('test'), {withFileTypes:true}, (err, data)=>{
//     if (err) throw new Error();
//     data.forEach(file=>{
//         console.log(file.isFile());
//     })
// })