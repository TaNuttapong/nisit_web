import { Col, Row } from "react-bootstrap";
import "../../../public/css/login.css";

export default function LoginPage() {
  return (
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
            <form action="../../index3.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    <h1 className="h7">Sign In</h1>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
}
