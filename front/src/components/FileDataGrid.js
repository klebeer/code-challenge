import React from 'react';
import Table from 'react-bootstrap/Table';

function FileDataGrid({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>File</th>
        <th>Text</th>
        <th>Number</th>
        <th>Hex</th>
      </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.file}</td>
          <td>{item.text}</td>
          <td>{item.number}</td>
          <td>{item.hex}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default FileDataGrid;
