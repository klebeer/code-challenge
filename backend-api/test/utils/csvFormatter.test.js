import { expect } from 'chai';
import { formatCSVData } from '../../src/utils/csvFormatter.js';

describe('formatCSVData', () => {
  it('should correctly format valid CSV data', () => {
    const csvData = `file,text,number,hex
file1,text1,1,hex1
file2,text2,2,hex2
file3,text3,3,hex3`;

    const expectedOutput = [
      { file: 'file1', text: 'text1', number: 1, hex: 'hex1' },
      { file: 'file2', text: 'text2', number: 2, hex: 'hex2' },
      { file: 'file3', text: 'text3', number: 3, hex: 'hex3' },
    ];

    expect(formatCSVData(csvData)).to.deep.equal(expectedOutput);
  });

  it('should throw error when CSV headers are invalid', () => {
    const csvData = `file,text,number,invalid
      file1,text1,1,hex1`;

    expect(() => formatCSVData(csvData)).to.throw('Invalid CSV headers');
  });

  it('should filter out invalid lines', () => {
    const csvData = `file,text,number,hex
file1,text1,1,hex1
file2,text2,hex2
file3,text3,3,hex3`;

    const expectedOutput = [
      { file: 'file1', text: 'text1', number: 1, hex: 'hex1' },
      { file: 'file3', text: 'text3', number: 3, hex: 'hex3' },
    ];

    expect(formatCSVData(csvData)).to.deep.equal(expectedOutput);
  });
});
