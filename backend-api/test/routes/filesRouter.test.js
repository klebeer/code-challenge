import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';

import app from '../../src/app.js';

chai.use(chaiHttp);

describe('GET /files/data', function () {
  beforeEach(() => {
    const files = ['test1.csv', 'test2.csv'];
    nock('https://echo-serv.tbxnet.com').get('/v1/secret/files').reply(200, { files });

    let index = 1;
    files.forEach((file) => {
      const fileContent = `file,text,number,hex\ntest${index}.csv,text${index},${index},hex${index}\n`;
      nock('https://echo-serv.tbxnet.com').get(`/v1/secret/file/${file}`).reply(200, fileContent);
      index++;
    });
  });

  it('should respond with file data', async function () {
    const res = await chai.request(app).get('/files/data');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(2);
    expect(res.body[0][0]).to.have.property('file');
    expect(res.body[0][0]).to.have.property('text');
    expect(res.body[0][0]).to.have.property('number');
    expect(res.body[0][0]).to.have.property('hex');
  });

  it('should respond with file data', async function () {
    const res = await chai.request(app).get('/files/data');

    const expected = [
      [
        {
          file: 'test1.csv',
          text: 'text1',
          number: 1,
          hex: 'hex1',
        },
      ],
      [
        {
          file: 'test2.csv',
          text: 'text2',
          number: 2,
          hex: 'hex2',
        },
      ],
    ];

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(2);
    expect(res.body).to.deep.equal(expected);
  });

  it('should respond with specific file data when fileName query param is provided', async function () {
    const res = await chai.request(app).get('/files/data?fileName=test1.csv');

    const expected = [
      [
        {
          file: 'test1.csv',
          text: 'text1',
          number: 1,
          hex: 'hex1',
        },
      ],
    ];

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(1);
    expect(res.body).to.deep.equal(expected);
  });

  it('should respond with a 404 error when a non-existent fileName is provided', async function () {
    const res = await chai.request(app).get('/files/data?fileName=nonExistent.csv');

    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.equal('File with name nonExistent.csv not found.');
  });
});
describe('GET /files/list', function () {
  beforeEach(() => {
    const files = ['test1.csv', 'test2.csv'];
    nock('https://echo-serv.tbxnet.com').get('/v1/secret/files').reply(200, { files });
  });

  it('should respond with a list of files', async function () {
    const res = await chai.request(app).get('/files/list');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('files');
    expect(res.body.files).to.be.an('array');
    expect(res.body.files).to.have.length(2);
    expect(res.body.files).to.include.members(['test1.csv', 'test2.csv']);
  });
});
