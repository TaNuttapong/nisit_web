import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import ContentLayout from "../../layouts/Content";
import AccountService from "../../services/account_services";
import { getAccountResponse } from "../../models/responses/AccountResponseModel";

export default function SuperAdminPage() {
  const { name } = useContext(AppContext);
  const [accountData, setAccountData] = useState<getAccountResponse[]>([]);
  const getAccount = async () => {
    await AccountService.listService()
      .then((res) => {
        setAccountData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAccount();
  }, []);
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
                        เพิ่มโครงงาน
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-two-profile-tab"
                        data-toggle="pill"
                        href="#custom-tabs-two-profile"
                        role="tab"
                        aria-controls="custom-tabs-two-profile"
                        aria-selected="false"
                      >
                        เพิ่มข้อมูลเกียรติบัตร
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-two-messages-tab"
                        data-toggle="pill"
                        href="#custom-tabs-two-messages"
                        role="tab"
                        aria-controls="custom-tabs-two-messages"
                        aria-selected="false"
                      >
                        เพิ่มข้อมูลนิสิต
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="custom-tabs-one-settings-tab"
                        data-toggle="pill"
                        href="#custom-tabs-one-settings"
                        role="tab"
                        aria-controls="custom-tabs-one-settings"
                        aria-selected="false"
                      >
                        จัดการผู้ใช้
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
                            <label htmlFor="exampleInputEmail1">
                              ชื่อโครงงาน*
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="ชื่อโครงงาน"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              รายระเอียด*
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="รายระเอียด"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputFile">รูปภาพ*</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="รูปภาพ"
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="exampleInputFile"
                                >
                                  Choose file
                                </label>
                              </div>
                              <div className="input-group-append">
                                <span className="input-group-text">Upload</span>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Date:</label>
                            <div
                              className="input-group date"
                              id="reservationdate"
                              data-target-input="nearest"
                            >
                              <input
                                type="text"
                                className="form-control datetimepicker-input"
                                data-target="#reservationdate"
                              />
                              <div
                                className="input-group-append"
                                data-target="#reservationdate"
                                data-toggle="datetimepicker"
                              >
                                <div className="input-group-text">
                                  <i className="fa fa-calendar"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Date End:</label>
                            <div
                              className="input-group date"
                              id="reservationdate2"
                              data-target-input="nearest"
                            >
                              <input
                                type="text"
                                className="form-control datetimepicker-input"
                                data-target="#reservationdate2"
                              />
                              <div
                                className="input-group-append"
                                data-target="#reservationdate2"
                                data-toggle="datetimepicker"
                              >
                                <div className="input-group-text">
                                  <i className="fa fa-calendar"></i>
                                </div>
                              </div>
                            </div>
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
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-two-profile"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-two-profile-tab"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="custom-tabs-two-home"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-two-home-tab"
                      >
                        <form>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                ชื่อโครงงาน*
                              </label>
                              <select
                                className="form-control"
                                id="exampleInputEmail1"
                              >
                                <option value="">กรุณาเลือกชื่อโครงงาน</option>
                                <option value="option1">ตัวเลือกที่ 1</option>
                                <option value="option2">ตัวเลือกที่ 2</option>
                                <option value="option3">ตัวเลือกที่ 3</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                แนบไฟล์ PDF*
                              </label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="PDF"
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="exampleInputFile"
                                  >
                                    Choose file
                                  </label>
                                </div>
                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    Upload
                                  </span>
                                </div>
                              </div>
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
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-two-messages"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-two-messages-tab"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="custom-tabs-two-home"
                        role="tabpanel"
                        aria-labelledby="custom-tabs-two-home-tab"
                      >
                        <form>
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                รูปแบบการเพิ่มข้อมูล*
                              </label>
                              <select
                                className="form-control"
                                id="exampleInputEmail1"
                              >
                                <option value="">
                                  กรุณาเลือกรูปแบบการเพิ่มข้อมูล
                                </option>
                                <option value="option2">
                                  เพิ่มข้อมูลด้วยไฟล์
                                </option>
                                <option value="option2">
                                  เพิ่มข้อมูลรายบุคคล
                                </option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                ชื่อโครงงาน*
                              </label>
                              <select
                                className="form-control"
                                id="exampleInputEmail1"
                              >
                                <option value="">กรุณาเลือกชื่อโครงงาน</option>
                                <option value="option1">ตัวเลือกที่ 1</option>
                                <option value="option2">ตัวเลือกที่ 2</option>
                                <option value="option3">ตัวเลือกที่ 3</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputFile">
                                แนบไฟล์ excel*
                              </label>
                              <div className="input-group">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="excel"
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="exampleInputFile"
                                  >
                                    Choose file
                                  </label>
                                </div>
                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    Upload
                                  </span>
                                </div>
                              </div>
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
                    <div
                      className="tab-pane fade"
                      id="custom-tabs-one-settings"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-one-settings-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Account</h3>

                          <div className="card-tools">
                            <ul className="pagination pagination-sm float-right">
                              <li>
                                <a className="btn btn-primary btn-sm " href="#">
                                  <i className="fas fa-plus pr-1"></i>
                                  Add Account
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="card-body p-0">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {accountData.map((item) => (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.email}</td>
                                  <td>{item.name}</td>
                                  <td>{item.branch}</td>
                                  <td>{item.role}</td>
                                  <td>
                                    <a
                                      className="btn btn-primary btn-sm"
                                      href="#"
                                    >
                                      <i className="fas fa-folder"></i>
                                      View
                                    </a>
                                  </td>
                                  <td>
                                    <a className="btn btn-info btn-sm" href="#">
                                      <i className="fas fa-pencil-alt"></i>
                                      Edit
                                    </a>
                                  </td>
                                  <td>
                                    <a
                                      className="btn btn-danger btn-sm"
                                      href="#"
                                    >
                                      <i className="fas fa-trash"></i>
                                      Delete
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer clearfix">
                        <ul className="pagination pagination-sm m-0 float-right">
                          <li className="page-item">
                            <a className="page-link" href="#">
                              &laquo;
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              &raquo;
                            </a>
                          </li>
                        </ul>
                      </div>
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
