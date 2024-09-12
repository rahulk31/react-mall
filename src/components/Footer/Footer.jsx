import "./footer.css";

const Footer = () => {
  return (
    <nav className="footer">
      <div className="logo">
        <h3>MALL</h3>
      </div>
      <ul>
        <a href="/">
          <li>Cancellations</li>
        </a>
        <a href="/">
          <li>Refunds</li>
        </a>
        <a href="/">
          <li>Terms & Conditions</li>
        </a>
      </ul>
    </nav>
  );
};

export default Footer;
