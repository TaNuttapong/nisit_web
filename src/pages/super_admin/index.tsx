import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import ContentLayout from "../../layouts/Content";
import AccountService from "../../services/account_services";
import { getAccountResponse } from "../../models/responses/AccountResponseModel";
import { AddAccountRequest } from "../../models/request/auth/addRequestModel";
import Swal from "sweetalert2";

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
  const [addAccount, setAddAccount] = useState<AddAccountRequest>({
    email: "",
    password: "",
    name: "",
    branch: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const addAccountHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const data: AddAccountRequest = {
      email: addAccount.email,
      password: addAccount.password,
      name: addAccount.name,
      branch: addAccount.branch,
    };
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
    } else {
      AccountService.addService(data)
        .then((res) => {
          if (res.data.status.code === "0000") {
            Swal.fire({
              icon: "success",
              title: "success",
              confirmButtonText: "OK",
              allowOutsideClick: true,
            }).then((result) => {
              setFormSubmitted(false);
              if (result.isConfirmed) {
                getAccount();
                ($("#addAccount") as any).modal("hide");
                setAddAccount({
                  email: "",
                  password: "",
                  name: "",
                  branch: "",
                });
              }
            });
          }
          console.log(res);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "failed",
            text: "AddAccount failed! Please try again.",
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "OK",
            allowOutsideClick: true,
          });
          console.log(err);
        });
    }
  };
  const deleteAccountHandler = (id: number) => {
    const accountId = String(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AccountService.deleteService(accountId)
          .then((res) => {
            if (res.data.status.code === "0000") {
              Swal.fire({
                icon: "success",
                title: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  getAccount();
                }
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "failed",
              text: "Delete Account failed! Please try again.",
              showConfirmButton: false,
              showDenyButton: true,
              denyButtonText: "OK",
              allowOutsideClick: false,
            });
          });
      }
    });
  };

  const modalShowAddAccount = () => {
    ($("#addAccount") as any).modal("show");
  };

  const modalShowEditAccount = () => {
    ($("#editAccount") as any).modal("show");
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
                            <label htmlFor="customFile">รูปภาพ*</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose file
                              </label>
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
                              <label htmlFor="customFile">แนบไฟล์ PDF*</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="customFile"
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Choose file
                                </label>
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
                              <label htmlFor="customFile">แนบไฟล์ excel*</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="customFile"
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Choose file
                                </label>
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
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#addAccount"
                                  onClick={modalShowAddAccount}
                                >
                                  <i className="fas fa-plus pr-1"></i>
                                  Add Account
                                </button>
                                <div
                                  className="modal fade"
                                  id="addAccount"
                                  tabIndex={-1}
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Add Account
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-dismiss="modal"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <form
                                          className="needs-validation"
                                          noValidate
                                          onSubmit={addAccountHandler}
                                        >
                                          <div className="card-body">
                                            <div className="form-group">
                                              <label htmlFor="exampleInputEmail1">
                                                Name*
                                              </label>
                                              <input
                                                type="text"
                                                className={`form-control ${
                                                  addAccount.name === "" &&
                                                  formSubmitted
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                id="name"
                                                value={addAccount.name}
                                                onChange={(e) =>
                                                  setAddAccount({
                                                    ...addAccount,
                                                    name: e.target.value,
                                                  })
                                                }
                                                placeholder="Name"
                                                required
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="exampleInputEmail1">
                                                branch*
                                              </label>
                                              <input
                                                type="text"
                                                className={`form-control ${
                                                  addAccount.branch === "" &&
                                                  formSubmitted
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                id="branch"
                                                value={addAccount.branch}
                                                onChange={(e) =>
                                                  setAddAccount({
                                                    ...addAccount,
                                                    branch: e.target.value,
                                                  })
                                                }
                                                placeholder="branch"
                                                required
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="exampleInputEmail1">
                                                email*
                                              </label>
                                              <input
                                                type="text"
                                                className={`form-control ${
                                                  addAccount.email === "" &&
                                                  formSubmitted
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                id="email"
                                                value={addAccount.email}
                                                onChange={(e) =>
                                                  setAddAccount({
                                                    ...addAccount,
                                                    email: e.target.value,
                                                  })
                                                }
                                                placeholder="email"
                                                required
                                              />
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="exampleInputPassword1">
                                                password*
                                              </label>
                                              <input
                                                type="password"
                                                className={`form-control ${
                                                  addAccount.password === "" &&
                                                  formSubmitted
                                                    ? "is-invalid"
                                                    : ""
                                                }`}
                                                id="password"
                                                value={addAccount.password}
                                                onChange={(e) =>
                                                  setAddAccount({
                                                    ...addAccount,
                                                    password: e.target.value,
                                                  })
                                                }
                                                placeholder="password"
                                                required
                                              />
                                            </div>
                                          </div>
                                          <div className="card-footer"></div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editAccount"
                                      onClick={modalShowEditAccount}
                                    >
                                      <i className="fas fa-edit pr-1"></i>
                                      Edit
                                    </button>
                                    <div
                                      className="modal fade"
                                      id="editAccount"
                                      tabIndex={-1}
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Edit Account
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-dismiss="modal"
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            <form>
                                              <div className="card-body">
                                                <div className="form-group">
                                                  <label htmlFor="exampleInputEmail1">
                                                    Name*
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Name"
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="exampleInputEmail1">
                                                    branch*
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="branch"
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="exampleInputEmail1">
                                                    email*
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="email"
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
                                                    Role
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Role"
                                                  />
                                                </div>
                                              </div>
                                              <div className="card-footer"></div>
                                            </form>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-primary"
                                            >
                                              Save changes
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        deleteAccountHandler(item.id)
                                      }
                                    >
                                      <i className="fas fa-trash"></i>
                                      Delete
                                    </button>
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
