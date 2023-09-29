import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logonisit from "../assets/images/logo_nisit.png";
import { Image } from "react-bootstrap";
import "../../public/css/footer.css";
import facebook from "../assets/icons/facebook (1).png";
import line from "../assets/icons/line (1).png";
import phone from "../assets/icons/phone-call.png";

export default function FooterCommon() {
  return (
    <div className="mt-5 borderfull">
      <Row className="bg">
        <Col sm={12} md={6} className="text-center borderright pt-3">
          <Image src={logonisit} alt="pro" className="" fluid />
          <div>
            <Image src={facebook} alt="pro" className="img-small" />
            <Image src={line} alt="pro" className="img-small" />
            <Image src={phone} alt="pro" className="img-small" />
            <strong className="textlg">tel.191</strong>
          </div>
        </Col>
        <Col sm={6} md={3} className="text-center">
          <strong className="textxl">Nisit</strong>
          <h2>Home</h2>
        </Col>
        <Col sm={6} md={3} className="text-center">
          <strong className="textxl">ADMIN</strong>
          <h2>Login</h2>
        </Col>
      </Row>
    </div>
  );
}
