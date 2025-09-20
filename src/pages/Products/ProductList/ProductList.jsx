import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductList({ data }) {
  return (
    <Container>
      <Row>
        {data.map((item) => (
          <Col key={item.id} lg={3} className="mb-4">
            <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <Card.Img variant="top" src={item.cover_image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
