const fs = require('fs');
const path = require('path');

async function clearImageDir() {
    const directoryPath = path.resolve(process.cwd(), 'generated-pictures');
    console.log(directoryPath)

    try {
        await fs.promises.access(directoryPath, fs.constants.F_OK);
        const files = await fs.promises.readdir(directoryPath);

        const deletePromises = files.map(file => fs.promises.unlink(path.join(directoryPath, file)));
        await Promise.all(deletePromises);

        console.log('[perchance-image-generator]: Image directory contents cleared.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('[perchance-image-generator]: Directory does not exist.');
        } else {
            console.error('[perchance-image-generator]: Error clearing directory:', error);
        }
    }
}

module.exports = clearImageDir
