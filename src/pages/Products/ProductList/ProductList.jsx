import { Container, Row, Col, Card } from "react-bootstrap";

export default function ProductList({ data }) {
  return (
    <Container>
      <Row>
        {data.map((item) => (
          <Col
            key={item.id}
            lg={3}
            className="mb-4"
            // style={{ minWidth: 100, width: "32%" }}
          >
            <Card>
              <Card.Img variant="top" src={item.cover_image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
