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
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>${data.price}</Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <div>
                  {data.available_colors.map((color, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="color"
                      id={`color-${index}`}
                      checked={data.available_colors[selector] === color}
                      onChange={() => setSelector(index)}
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <div>
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
                          style={{ marginRight: "5px" }}
                        >
                          {size}
                        </Button>
                      ))
                    : "N/A"}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
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
                variant="danger"
                disabled={!disableAddToCart}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </Form>
            <Card.Text className="mt-3">
              <strong>Details</strong>
              <p>Brand: {data.brand.name ? data.brand.name : "N/A"}</p>
              <p>{data.description ? data.description : "N/A"}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </>
  );
}
