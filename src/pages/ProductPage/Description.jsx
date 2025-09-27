import { Card, Button, Form, Stack } from "react-bootstrap";
import Cookies from "js-cookie";
import "./Description.css";

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
    <Stack>
      <Card>
        <Card.Body className="product-page-description-body">
          <Card.Title className="mb-4 product-page-description-title">
            {data.name}
          </Card.Title>

          <Card.Text className="product-page-description-price">
            <b>$ {data.price}</b>
          </Card.Text>

          <Form>
            <Form.Group className="mb-5">
              <Form.Label className="product-page-description-color-label">
                Color: {data.available_colors[selector]}
              </Form.Label>
              <div>
                {data.available_colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelector(index)}
                    className="product-page-description-color-option"
                    style={{
                      backgroundColor: color,
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
              <div className="product-page-description-size-container">
                {data.available_sizes
                  ? data.available_sizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          selectedSize === size
                            ? "primary"
                            : "outline-secondary"
                        }
                        onClick={() => setSelectedSize(size)}
                        className="product-page-description-size-button"
                        style={{
                          color: selectedSize === size ? "white" : "grey",
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
              <Form.Label className="product-page-description-quantity-label">
                Quantity
              </Form.Label>
              <Form.Control
                as="select"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="product-page-description-quantity-select"
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
              className="product-page-description-addtocart"
            >
              <img
                src="/images/white_cart.png"
                alt="white cart"
                width={24}
                height={24}
                className="description-button-icon"
              />
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
  );
}
