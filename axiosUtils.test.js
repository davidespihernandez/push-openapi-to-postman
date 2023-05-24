const process = require('process');
const {getAxiosConfig} = require("./axiosUtils");


describe('test axiosUtils', () => {
    test('getAxiosConfig returns expected config with headers', () => {
        const API_KEY = 'POSTMAN_API_KEY'
        process.env['POSTMAN_API_KEY'] = API_KEY;
        const config = getAxiosConfig();
        expect(config).toEqual({
            headers: {
                'x-api-key': API_KEY,
                Accept: 'application/vnd.api.v10+json',
                'Content-Type': 'application/json',
            }
        });
    });
});
