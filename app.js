const fs = require('node:fs/promises');
const path = require('node:path');

// const worker = async () => {
//     try {
//         const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
//         const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];
//
//         for (const folderName of folderNames) {
//             await fs.mkdir(path.join(process.cwd(), folderName), {recursive: true})
//         }
//         for (const fileName of fileNames) {
//             await fs.writeFile(path.join(process.cwd(), fileName), 'hello everybody!!!!')
//         }
//     } catch (e) {
//         console.log(e.message);
//     }
// }
//
// worker().then();

const worker = async () => {
    const fileNames = ['test1.txt', 'test2.txt', 'test3.txt', 'test4.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];

    const promises = folderNames.map(async (folderName, index) => {
        const folderPath = path.join(process.cwd(), folderName);

        await fs.mkdir(folderPath, {recursive: true});
        await fs.writeFile(path.join(folderPath, fileNames[index]), 'Hello World🥰');
    });
    // console.log(promises);
    await Promise.all(promises);
    const files = await fs.readdir(path.join(process.cwd()));
    // console.log(files);
    for (const file of files) {
        const stats = await fs.stat(path.join(process.cwd(), file));
        const isFile = stats.isFile();
        if (isFile) {
            console.log('This is file: ', (path.join(process.cwd(), file)));
        } else {
            console.log('This is directory: ', (path.join(process.cwd(), file)));
        }
    }
}

worker().then();