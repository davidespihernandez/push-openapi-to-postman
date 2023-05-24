const core = require('@actions/core');

const readFile = require('./readFile');
const updateSchemaFile = require('./updateSchemaFile');
const createNewVersion = require('./createNewVersion');
const run = require('./run');


jest.mock('./readFile');
jest.mock('./updateSchemaFile');
jest.mock('./createNewVersion');
jest.mock('@actions/core');

const CREATED_ID = 'CREATED_ID';
const INPUT_VARIABLES = {
  'path-to-definition': './openAPI.json',
  'api-id': 'API_ID',
  'schema-id': 'SCHEMA_ID',
  'api-path-to-file-name': 'index.json',
  'version-name': '1.0.0',
  'release-notes': 'First release',
};

describe('test run', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(core, 'getInput').mockImplementation((argument) => {
      return INPUT_VARIABLES[argument];
    });
  });

  test('when everything works properly', async () => {
    readFile.mockReturnValue('text');
    createNewVersion.mockReturnValue(CREATED_ID);

    await run();

    expect(readFile).toHaveBeenCalledWith('./openAPI.json');
    expect(updateSchemaFile).toHaveBeenCalledWith('API_ID', 'SCHEMA_ID', 'text', 'index.json');
    expect(createNewVersion).toHaveBeenCalledWith('API_ID', 'SCHEMA_ID', '1.0.0', 'First release');
    expect(core.setOutput).toHaveBeenCalledWith('createdVersionId', CREATED_ID);
  });

  test('when readFile fails', async () => {
    readFile.mockImplementation(() => {
      throw new Error('Error reading file');
    });

    await run();

    expect(readFile).toHaveBeenCalledWith('./openAPI.json');
    expect(updateSchemaFile).not.toHaveBeenCalled();
    expect(createNewVersion).not.toHaveBeenCalled();
    expect(core.setFailed).toHaveBeenCalledWith('Error reading file');
  });

  test('when updateSchemaFile fails', async () => {
    readFile.mockReturnValue('text');
    updateSchemaFile.mockImplementation(() => {
      const error = new Error('Error updating schema');
      error.response = {
        status: 400,
        data: 'Error',
      }
      throw error;
    });

    await run();

    expect(readFile).toHaveBeenCalledWith('./openAPI.json');
    expect(updateSchemaFile).toHaveBeenCalledWith('API_ID', 'SCHEMA_ID', 'text', 'index.json');
    expect(createNewVersion).not.toHaveBeenCalled();
    expect(core.setFailed).toHaveBeenCalledWith('Error updating schema. Error code: 400. Error body: "Error"');
  });

  test('when createNewVersion fails', async () => {
    readFile.mockReturnValue('text');
    createNewVersion.mockImplementation(() => {
      const error = new Error('Error creating new version');
      error.response = {
        status: 400,
        data: 'Error',
      }
      throw error;
    });

    await run();

    expect(readFile).toHaveBeenCalledWith('./openAPI.json');
    expect(updateSchemaFile).toHaveBeenCalledWith('API_ID', 'SCHEMA_ID', 'text', 'index.json');
    expect(createNewVersion).toHaveBeenCalledWith('API_ID', 'SCHEMA_ID', '1.0.0', 'First release');
    expect(core.setFailed).toHaveBeenCalledWith('Error creating new version. Error code: 400. Error body: "Error"');
  });

});

