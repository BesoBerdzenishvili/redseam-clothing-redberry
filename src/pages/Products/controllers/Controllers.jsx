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
    <Container fluid style={{ marginBottom: 30 }}>
      <Row>
        <Col md={6}>
          <h1 style={{ fontWeight: "semibold" }}>Products</h1>
        </Col>
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <div className="me-3">
            Showing {meta.from}-{meta.to} of {meta.total} results
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="filter-dropdown">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu className="custom-dropdown-menu">
              <Form style={{ width: 392, height: 150, padding: "8px 15px" }}>
                <Form.Group controlId="formPriceRange">
                  <Form.Label style={{ fontWeight: "bold", marginBottom: 20 }}>
                    Select price
                  </Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        name="from"
                        value={priceRange.from}
                        onChange={handlePriceChange}
                        // change color with css
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#FF4000",
                        border: "none",
                        padding: "9px 39px",
                        borderRadius: 9,
                      }}
                      onClick={handleSort}
                      className="mt-2"
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
            <Dropdown.Menu style={{ width: 200, height: 180, paddingTop: 14 }}>
              <div style={{ margin: "0 0 9px 15px" }}>
                <b>Sort by</b>
              </div>
              <Dropdown.Item
                style={{ marginBottom: 9 }}
                onClick={() => handleSort("created_at")}
              >
                New products first
              </Dropdown.Item>
              <Dropdown.Item
                style={{ marginBottom: 9 }}
                onClick={() => handleSort("price")}
              >
                Price, low to high
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("-price")}>
                Price, high to low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
}
