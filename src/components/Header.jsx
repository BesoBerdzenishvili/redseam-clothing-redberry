import { useState } from "react";
import "./Header.css";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate("/");
    location.reload();
  };

  return (
    <Navbar expand="lg" className="py-2">
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center fw-semibold fs-6 custom-brand"
          onClick={refreshPage}
        >
          <Image
            src="/vite.png"
            alt="RedSeam Logo"
            className="redseam-logo me-2"
          />
          RedSeam Clothing
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link href="#" className="p-0 me-3">
            <Image
              src="/images/cart.png"
              alt="shopping cart"
              className="shopping-cart"
              width={24}
              height={24}
              onClick={handleShow}
            />
          </Nav.Link>
          <Image
            className="profile-img"
            width={44}
            height={44}
            src="https://mn2s.com/wp-content/uploads/2024/11/Sunmi.png"
            alt="Profile image"
            roundedCircle
          />
        </Nav>
      </Container>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: 550 }}
      >
        <CartSidebar />
      </Offcanvas>
    </Navbar>
  );
}
