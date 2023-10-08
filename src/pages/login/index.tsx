import { Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { LoginRequest } from "../../models/request/auth/LoginRequestModel";
import AuthService from "../../services/auth/auth_services";
import { useNavigate } from "react-router-dom";
import { PermissionEnum } from "../../enum/permission.enum";
import { PathEnum } from "../../enum/path.enum";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import decodeToken from "../../utils/decode";
import { AppContext } from "../../contexts/AppContext";
import ContentLayout from "../../layouts/Content";

export default function LoginPage() {
  const { setEmail, setName, setBranch, setRole } = useContext(AppContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const data: LoginRequest = {
      email: login.email,
      password: login.password,
    };
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
    } else {
      AuthService.loginService(data)
        .then((res) => {
          if (res.data.status.code === "0000") {
            Cookies.set("token", res.data.data.access_token);
            const decodeData = decodeToken(res.data.data.access_token);
            setEmail(decodeData.email);
            setName(decodeData.name);
            setBranch(decodeData.branch);
            setRole(decodeData.role);
            Swal.fire({
              icon: "success",
              title: "login success",
              confirmButtonText: "OK",
              allowOutsideClick: true,
            }).then((result) => {
              setFormSubmitted(false);
              if (result.isConfirmed) {
                if (res.data.data.role === PermissionEnum.ADMIN) {
                  navigate(PathEnum.ADMIN_PAGE);
                } else {
                  navigate(PathEnum.USER_PAGE);
                }
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "failed",
              text: "Login failed! Please try again.",
              showConfirmButton: false,
              showDenyButton: true,
              denyButtonText: "OK",
              allowOutsideClick: true,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "failed",
            text: "Login failed! Please try again.",
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "OK",
          });
        });
    }
  };

  return (
    <ContentLayout
      content={
        <>
          <Row>
            <Col sm={10} md={6} className="mt-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-responsive "
                alt="Phone image"
              />
            </Col>
            <Col sm={5} md={6} className="center mt-5 ">
              <div className="card card-outline card-primary col-10 ">
                <div className="card-header text-center">
                  <a href="/" className="h1">
                    <b>ADMIN</b>
                  </a>
                </div>
                <div className="card-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                  <form
                    className="needs-validation"
                    noValidate
                    onSubmit={loginHandler}
                  >
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className={`form-control ${
                          login.email === "" && formSubmitted
                            ? "is-invalid"
                            : ""
                        }`}
                        id="email"
                        value={login.email}
                        onChange={(e) =>
                          setLogin({ ...login, email: e.target.value })
                        }
                        placeholder="Email"
                        required
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope" />
                        </div>
                      </div>
                      {login.email === "" && formSubmitted && (
                        <div className="invalid-feedback">Email</div>
                      )}
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className={`form-control ${
                          login.password === "" && formSubmitted
                            ? "is-invalid"
                            : ""
                        }`}
                        id="password"
                        value={login.password}
                        onChange={(e) =>
                          setLogin({ ...login, password: e.target.value })
                        }
                        placeholder="password"
                        required
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                      {login.password === "" && formSubmitted && (
                        <div className="invalid-feedback">password</div>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </>
      }
    />
  );
}
