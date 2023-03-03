// ---Events---
// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', (data) => {
//     console.log(data);
//     console.log('Click, click, click');
// });
//
// eventEmitter.emit('click', {name: 'Anton'});
//
// eventEmitter.once('clickAndDie', () => {
//     console.log("I'm gonna die after being called");
// });
//
// eventEmitter.emit('clickAndDie');
//
// console.log(eventEmitter.eventNames());



//---Streams---

// duplex, transform, read, write--types of streams

// const fs = require('node:fs');
// const path = require("path");
//
// const readStream = fs.createReadStream(path.join('test', 'text3.txt'), {encoding: "utf-8"});
// const writeStream = fs.createWriteStream(path.join('test', 'text2.txt'));
//
// // readStream.on('data', (chunk) => {
// //     writeStream.write(chunk)
// //     // console.log(chunk);
// // })
//
// const handleError=()=>{
//     console.error('ERROR');
//     readStream.destroy();
//     writeStream.end('ERROR WHILE READING FILE');
// }
//
// readStream
//     .on('error', handleError)
//     .pipe(writeStream);
