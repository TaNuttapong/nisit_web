import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { PathEnum } from "../enum/path.enum";
import logo from "../assets/images/logo_nisit.png";
import "../../public/css/nav.css";

export default function NavbarCommon() {
  const { pathUrl } = useContext(AppContext);
  return (
    <Navbar collapseOnSelect expand="lg" className=" bgnav">
      <Container>
        <Navbar.Brand href="/">
          <img className="imgsmall" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href={PathEnum.HOME}
              className={`nav-link ${
                pathUrl === PathEnum.HOME ? "active" : ""
              }`}
            >
              <h4>หน้าหลัก</h4>
            </Nav.Link>
            <Nav.Link
              href={PathEnum.LOGIN}
              className={`nav-link ${
                pathUrl === PathEnum.LOGIN ? "active" : ""
              }`}
            >
              <h4>เข้าสู่ระบบ</h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
