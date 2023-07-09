import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

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
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>CSV Files List</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="auto">
          <FormControl
            type="text"
            placeholder="Filter by file name"
            onChange={handleFilterChange}
            value={filter}
          />
        </Col>
        <Col md="auto">
          <Button onClick={handleSearchClick}>Search</Button>
        </Col>
        <Col md="auto">
          <Button onClick={handleClearClick}>Clear</Button>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
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
        </Col>
      </Row>
    </Container>
  );
}

export default FileDataGrid;
