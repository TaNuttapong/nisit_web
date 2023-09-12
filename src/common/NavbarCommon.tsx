import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { PathEnum } from "../enum/path.enum";

export default function NavbarCommon() {
  const { pathUrl } = useContext(AppContext);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href={PathEnum.HOME}
              className={`nav-link ${
                pathUrl === PathEnum.HOME ? "active" : ""
              }`}
            >
              หน้าหลัก
            </Nav.Link>
            <Nav.Link
              href={PathEnum.LOGIN}
              className={`nav-link ${
                pathUrl === PathEnum.LOGIN ? "active" : ""
              }`}
            >
              เข้าสู่ระบบ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
