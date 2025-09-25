import { Card, Button, Form, Stack } from "react-bootstrap";
import Cookies from "js-cookie";

export default function Description({
  data,
  selector,
  setSelector,
  selectedSize,
  quantity,
  setSelectedSize,
  setQuantity,
  addToCart,
}) {
  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);
  const disableAddToCart = user && user.email && data.available_sizes;
  return (
    <>
      <Stack>
        <Card>
          <Card.Body style={{ width: 700, height: "100%" }}>
            <Card.Title
              className="mb-4"
              style={{ fontSize: 32, fontWeight: "bold" }}
            >
              {data.name}
            </Card.Title>
            <Card.Text style={{ fontSize: 32, marginBottom: 60 }}>
              <b> $ {data.price}</b>
            </Card.Text>
            <Form>
              <Form.Group className="mb-5">
                <Form.Label style={{ marginBottom: 20 }}>
                  Color: {data.available_colors[selector]}
                </Form.Label>
                <div>
                  {data.available_colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setSelector(index)}
                      style={{
                        display: "inline-block",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        marginRight: "15px",
                        cursor: "pointer",
                        border:
                          data.available_colors[selector] === color
                            ? "1px solid grey"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Size: {selectedSize}</Form.Label>
                <div
                  style={{
                    margin: "10px",
                  }}
                >
                  {data.available_sizes
                    ? data.available_sizes.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size
                              ? "primary"
                              : "outline-primary"
                          }
                          onClick={() => setSelectedSize(size)}
                          style={{
                            marginRight: "10px",
                            padding: "8px 25px",
                            borderRadius: 10,
                            color: selectedSize === size ? "white" : "grey",
                            // TODO: change on hover too
                            border: "1px solid lightgrey",
                            background: selectedSize === size ? "grey" : "",
                          }}
                        >
                          {size}
                        </Button>
                      ))
                    : "N/A"}
                </div>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label style={{ marginBottom: 12 }}>Quantity</Form.Label>
                <Form.Control
                  style={{ width: 70, borderRadius: 10, padding: 8 }}
                  as="select"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                size="lg"
                variant="danger"
                disabled={!disableAddToCart}
                onClick={addToCart}
                style={{
                  fontSize: 18,
                  padding: "16px 250px",
                  width: "100%",
                  borderRadius: 12,
                  margin: "0 0 115px 0",
                  backgroundColor: "#ff4000",
                  border: "none",
                }}
              >
                {/* TODO: add cart icon */}
                Add to cart
              </Button>
            </Form>
            <Card.Text className="mt-4">
              <h5>Details</h5>
              <p className="pt-3">
                Brand: {data.brand.name ? data.brand.name : "N/A"}
              </p>
              <p>{data.description ? data.description : "N/A"}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </>
  );
}
