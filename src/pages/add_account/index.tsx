import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import ContentLayout from "../../layouts/Content";

export default function AddAccountPage() {
  const { name } = useContext(AppContext);

  return (
    <ContentLayout
      content={
        <>
          <div className="row m-5">
            <div className="col-12 col-sm-12 mt-5">
              <div className="card card-primary card-tabs">
                <div className=" p-0 pt-1 bg">
                  <ul
                    className="nav nav-tabs"
                    id="custom-tabs-two-tab"
                    role="tablist"
                  >
                    <li className="pt-2 px-3">
                      <h3 className="card-title">{name}</h3>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="custom-tabs-two-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-two-home"
                        role="tab"
                        aria-controls="custom-tabs-two-home"
                        aria-selected="true"
                      >
                        Add Account
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="custom-tabs-two-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="custom-tabs-two-home"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-two-home-tab"
                    >
                      <form>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">email*</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="ชื่อโครงงาน"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              password*
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="password"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Check password*
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="password"
                            />
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              Check me out
                            </label>
                          </div>
                        </div>

                        <div className="card-footer">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
