import nock from 'nock';
import { expect } from 'chai';

import { getExternalFiles, getFileContent } from '../../src/services/fileService.js';

describe('File Service', () => {
  describe('getExternalFiles', () => {
    it('should return file list when API responds successfully', async () => {
      nock('https://echo-serv.tbxnet.com')
        .get('/v1/secret/files')
        .reply(200, {
          files: [
            'test1.csv',
            'test2.csv',
            'test3.csv',
            'test18.csv',
            'test4.csv',
            'test5.csv',
            'test6.csv',
            'test9.csv',
            'test15.csv',
          ],
        });

      const files = await getExternalFiles();
      expect(files).to.deep.equal([
        'test1.csv',
        'test2.csv',
        'test3.csv',
        'test18.csv',
        'test4.csv',
        'test5.csv',
        'test6.csv',
        'test9.csv',
        'test15.csv',
      ]);
    });

    it('should handle file not found errors', async () => {
      nock('https://echo-serv.tbxnet.com').get('/v1/secret/file/test5.csv').reply(200, {
        code: 'SYS-ERR',
        message: 'Not Found',
        details: null,
        status: 404,
      });

      try {
        await getFileContent('test5.csv');
      } catch (err) {
        expect(err.response.data).to.deep.equal({
          code: 'SYS-ERR',
          message: 'Not Found',
          details: null,
          status: 404,
        });
      }
    });
    it('should handle valid CSV data', async () => {
      const testFilename = 'test2.csv';
      const csvData = `file,text,number,hex\ntest2.csv,text2,2,hex2`;

      nock('https://echo-serv.tbxnet.com').get(`/v1/secret/file/${testFilename}`).reply(200, csvData);

      const fileContent = await getFileContent(testFilename);
      expect(fileContent.trim()).to.equal(csvData.trim());
    });
  });
});
