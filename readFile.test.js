const { promises: fs } = require('fs');
const readFile = require('./readFile');


describe('test readFile', () => {
    test('retrieves the file contents', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation(() => Buffer.from('content'));
        const content = await readFile("index.json");
        expect(content).toEqual("content");
    });
});

