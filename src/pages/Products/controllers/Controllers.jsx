import { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useSearchParams } from "react-router";
import "./Controllers.css";

export default function Controllers({ meta, filters }) {
  // TODO: make sure searchParams is neccessary
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState(
    filters || {
      from: "",
      to: "",
    }
  );

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (sortType) => {
    const sort = typeof sortType === "string" ? sortType : "";
    const from = priceRange.from || "";
    const to = priceRange.to || "";
    setSearchParams(`?sort=${sort}&from=${from}&to=${to}`);
  };

  return (
    <Container fluid className="controllers-container">
      <Row>
        <Col md={6}>
          <h1 className="controllers-title">Products</h1>
        </Col>
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <div className="controllers-meta-text me-3">
            Showing {meta.from}-{meta.to} of {meta.total} results
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="filter-dropdown">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu className="controllers-filter-dropdown">
              <Form className="controllers-filter-form">
                <Form.Group controlId="formPriceRange">
                  <Form.Label className="controllers-filter-label">
                    Select price
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        name="from"
                        value={priceRange.from}
                        onChange={handlePriceChange}
                        placeholder="From *"
                        min={0}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        name="to"
                        value={priceRange.to}
                        onChange={handlePriceChange}
                        placeholder="To *"
                        min={0}
                      />
                    </Col>
                  </Row>
                  <div className="controllers-apply-container">
                    <Button
                      className="controllers-apply-btn mt-2"
                      onClick={handleSort}
                    >
                      Apply
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="ms-2">
            <Dropdown.Toggle variant="secondary" id="sort-dropdown">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu className="controllers-sort-dropdown">
              <div className="controllers-sort-header">
                <b>Sort by</b>
              </div>
              <Dropdown.Item
                className="controllers-sort-item"
                onClick={() => handleSort("created_at")}
              >
                New products first
              </Dropdown.Item>
              <Dropdown.Item
                className="controllers-sort-item"
                onClick={() => handleSort("price")}
              >
                Price, low to high
              </Dropdown.Item>
              <Dropdown.Item
                className="controllers-sort-item"
                onClick={() => handleSort("-price")}
              >
                Price, high to low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}
