import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header_left">
        <img src="/vite.png" alt="RedSeam Logo" className="redseam_logo" />{" "}
        RedSeam Clothing
      </div>
      <div className="header_right">
        <img
          src="/images/cart.png"
          alt="shoping cart"
          className="shoping_cart"
          width={24}
        />
        <img
          className="profile_img"
          width={44}
          height={44}
          src="https://mn2s.com/wp-content/uploads/2024/11/Sunmi.png"
          alt="Profile image"
        />
      </div>
    </header>
  );
}
