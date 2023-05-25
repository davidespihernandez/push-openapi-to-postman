const core = require('@actions/core');
const axios = require('axios');
const {getAxiosConfig} = require('./axiosUtils');
const {POSTMAN_API_BASE_URL} = require('./constants');

const createNewVersion = async (postmanApiKey, apiId, schemaId, versionName, releaseNotes) => {
    core.info(`Creating new version on Postman ...`);
    const response = await axios.put(
        `${POSTMAN_API_BASE_URL}/apis/${apiId}/versions`,
        {
            'name': versionName,
            'releaseNotes': releaseNotes,
            'collections': [],
            'schemas': [
                {
                    'id': schemaId
                }
            ]
        },
        getAxiosConfig(postmanApiKey),
    );
    core.debug(`Postman API PUT createNewVersion response code: ${response.status}`);
    return response.data['id'];
}

module.exports = createNewVersion;
