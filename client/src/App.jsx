// src/SearchPage.js
import React, { useState } from "react";
import { Form, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// require("dotenv").config();

const URL = `http://localhost:8080`;
// const URL = import.meta.env.REACT_APP_URL;
export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${URL}/search?keyword=${searchTerm}`);
      const res = await response.json();
      console.log(`logging`, res);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="position-fixed start-50 translate-middle-x top-0 mt-4">
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Container className="d-flex flex-column align-items-center mt-4">
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}></Col>
        </Row>

        <Row className="mt-4">
          {searchResults.map((result) => (
            <Col key={result.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Card.Text>{result.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
