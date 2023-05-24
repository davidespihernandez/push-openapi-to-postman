const core = require('@actions/core');
const { promises: fs } = require('fs');


const readFile = async (path) => {
    core.info(`Reading ${path} file ...`);
    let content = await fs.readFile(path, 'utf8');
    core.debug(`File read`);
    return content.toString();
}

module.exports = readFile;
