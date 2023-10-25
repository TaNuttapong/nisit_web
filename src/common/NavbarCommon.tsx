import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
import { PathEnum } from "../enum/path.enum";
import logo from "../assets/images/logo_nisit.png";
import AuthService from "../services/auth/auth_services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavbarCommon() {
  const { pathUrl, role, setEmail, setName, setBranch, setRole } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await AuthService.logoutService();

      if (res.data.data) {
        await Swal.fire({
          icon: "success",
          title: "Logout success",
          confirmButtonText: "OK",
          allowOutsideClick: true,
        });

        Cookies.remove("token");
        setEmail("");
        setName("");
        setBranch("");
        setRole("");
        navigate(PathEnum.LOGIN);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Logout failed! Please try again.",
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: "OK",
          allowOutsideClick: true,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Logout failed! Please try again.",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "OK",
        allowOutsideClick: true,
      });
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className=" bgnav ">
      <Container>
        <Navbar.Brand href="/">
          <img className=" img-responsivenav" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto color-h4">
            <Nav.Link
              href={PathEnum.HOME}
              className={`nav-link ${
                pathUrl === PathEnum.HOME ? "active" : ""
              }`}
            >
              <h4 className="color-h4">หน้าหลัก</h4>
            </Nav.Link>
            <Nav.Link
              className={`nav-link ${
                pathUrl === PathEnum.LOGIN ? "active" : ""
              }`}
            >
              <a
                className="color-h4 h4 text-decoration"
                onClick={
                  role === "" ? () => navigate(PathEnum.LOGIN) : handleLogout
                }
              >
                {role === "" ? "เข้าสู่ระบบ" : "ออกจากระบบ"}
              </a>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
