import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function FileDataGrid({ data, onFilter }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchClick = () => {
    onFilter(filter || undefined);
  };

  const handleClearClick = () => {
    setFilter('');
    onFilter(undefined);
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Filter by file name"
        onChange={handleFilterChange}
        value={filter}
      />
      <Button onClick={handleSearchClick}>Search</Button>
      <Button onClick={handleClearClick}>Clear</Button>
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
    </div>
  );
}

export default FileDataGrid;
