const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const updateSchemaFile = async (apiId, schemaId, fileContents, fileName) => {
    core.info(`Updating file content on Postman ...`);
    const response = await axios.put(
        `${POSTMAN_API_BASE_URL}/apis/${apiId}/schemas/${schemaId}/files/${fileName}`,
        {'content': JSON.stringify(fileContents)},
        getAxiosConfig(),
    );
    //core.debug(`Postman API PUT updateSchemaFile response code: ${response.status}`);
    return response;
}

module.exports = updateSchemaFile;
