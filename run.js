const core = require('@actions/core');
const readFile = require('./readFile');
const updateSchemaFile = require('./updateSchemaFile');
const createNewVersion = require('./createNewVersion');


async function run() {
  try {
    const path = core.getInput('path-to-definition');
    const apiId = core.getInput('api-id');
    const schemaId = core.getInput('schema-id');
    const fileName = core.getInput('api-path-to-file-name');
    const versionName = core.getInput('version-name');
    const releaseNotes = core.getInput('release-notes');

    core.info(`Reading OpenAPI definition file ...`);
    const openAPIFileContents = await readFile(path);

    core.info(`Updating schema file ...`);
    await updateSchemaFile(apiId, schemaId, openAPIFileContents, fileName);

    core.info(`Creating new version ...`);
    const createdVersionId = await createNewVersion(apiId, schemaId, versionName, releaseNotes);

    core.setOutput('createdVersionId', createdVersionId);
  } catch (error) {
    let message = error.message;
    if (error.response) {
      message = `${message}. Error code: ${error.response.status}. Error body: ${JSON.stringify(error.response.data)}`;
    }
    core.setFailed(message);
  }
}

module.exports = run;
