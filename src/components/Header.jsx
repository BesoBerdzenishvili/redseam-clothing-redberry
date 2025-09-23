import { useState, useEffect } from "react";
import "./Header.css";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import CartSidebar from "./CartSidebar";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const refreshPage = () => {
    navigate("/");
    location.reload();
  };

  const userData = Cookies.get("user");
  const user = userData && JSON.parse(userData);
  const avatar = user && user.avatar ? user.avatar : "./images/avatar.png";

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
          {user ? (
            <>
              <Image
                src="/images/cart.png"
                alt="shopping cart"
                className="shopping-cart me-3"
                style={{ cursor: "pointer" }}
                width={24}
                height={24}
                onClick={handleShow}
              />

              <Image
                className="profile-img"
                width={44}
                height={44}
                src={avatar}
                alt="Profile image"
                roundedCircle
              />
            </>
          ) : (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: 12,
              }}
              to="/login"
            >
              <Image
                className="me-2"
                src="./images/login.png"
                width={12}
                height={16}
              />
              Log in
            </Link>
          )}
        </Nav>
      </Container>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: 550 }}
      >
        <CartSidebar handleClose={handleClose} />
      </Offcanvas>
    </Navbar>
  );
}
