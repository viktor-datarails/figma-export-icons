const svgtofont = require('svgtofont');
const path = require('path');
const fs = require('fs');

const iconPrefix = 'dr-icon-'
const sourcePath = './src/icons';
const destinationPath = './dist/svg';
fs.readdir(sourcePath, (err, files) => {
    if (err) {
        console.error('Error reading folder:', err);
        return;
    }

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    files.forEach((file) => {
        const oldFilePath = path.join(sourcePath, file);
        let newFileName = file.toLowerCase();
        if (!newFileName.startsWith(iconPrefix)) {
            newFileName = iconPrefix + newFileName;
        }
        const newFilePath = path.join(destinationPath, newFileName);

        fs.copyFile(oldFilePath, newFilePath, (err) => {if (err) throw err;});
    });
});

svgtofont({
    src: path.resolve(process.cwd(), 'dist/svg'),
    dist: path.resolve(process.cwd(), 'dist/font'),
    fontName: 'DataRails',
    fontSize: '24px',
    css: true,
    classNamePrefix: 'dr-icon'
}).then(() => {
    console.log('done!');
});
