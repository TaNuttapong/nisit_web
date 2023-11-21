import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import ContentLayout from "../../layouts/Content";
import AccountService from "../../services/account_services";
import {
  addAccountResponse,
  getAccountResponse,
} from "../../models/responses/AccountResponseModel";
import {
  AddAccountRequest,
  UpdateAccountRequest,
} from "../../models/request/auth/addRequestModel";
import Swal from "sweetalert2";
import ProjectService from "../../services/project_services";
import { AddProjectRequest } from "../../models/request/auth/projectRequestModel";
import { AddNiSitRequest } from "../../models/request/auth/nisitRequestModel";
import NisitService from "../../services/nisit_servicers";
import { getProjectResponse } from "../../models/responses/ProjectResponseModel";
import folder from "../../utils/folder";

export default function SuperAdminPage() {
  const { name, accountId } = useContext(AppContext);
  const [select, setSelect] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [accountData, setAccountData] = useState<getAccountResponse[]>([]);
  const [projectData, setProjectData] = useState<getProjectResponse[]>([]);
  const [addAccount, setAddAccount] = useState<AddAccountRequest>({
    email: "",
    password: "",
    name: "",
    branch: "",
  });
  const [updateAccount, setUpdateAccount] = useState<UpdateAccountRequest>({
    email: "",
    name: "",
    branch: "",
  });
  const [updateId, setUpdateId] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [addProject, setAddProject] = useState<AddProjectRequest>({
    project_name: "",
    description: "",
    image: "",
    start_date: "",
    end_date: "",
    link: "",
  });
  const [addNisit, setAddNisit] = useState<AddNiSitRequest>({
    project_id: "",
    name: "",
    student_id: "",
    classStudent: "",
  });
  const [addNisitExcel, setAddNisitExcel] = useState<string>("");
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
  const editAccountHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const accountId = String(updateId);

    const data: UpdateAccountRequest = {
      email: updateAccount.email,
      name: updateAccount.name,
      branch: updateAccount.branch,
    };
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
    } else {
      AccountService.updateAccountService(accountId, data).then((res) => {
        if (res.data.status.code === "0000") {
          Swal.fire({
            icon: "success",
            title: "success",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          })
            .then((result) => {
              if (result.isConfirmed) {
                getAccount();
                setFormSubmitted(false);
                ($("#editAccount") as any).modal("hide");
                setUpdateAccount({
                  email: "",
                  name: "",
                  branch: "",
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "failed",
                text: "Update Account failed! Please try again.",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "OK",
                allowOutsideClick: false,
              });
            });
        }
      });
    }
  };
  const getProject = async () => {
    await ProjectService.listProjectService()
      .then((res) => {
        setProjectData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const addProjectHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    const data: AddProjectRequest = {
      project_name: addProject.project_name,
      description: addProject.description,
      image: addProject.image,
      start_date: addProject.start_date,
      end_date: addProject.end_date,
      link: addProject.link,
      account_id: accountId,
    };

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
    } else {
      if (selectedFile) {
        const folderPath = await folder.createUniqueFolder();
        const imageName = selectedFile.name;

        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);

        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const imageData = new Uint8Array(arrayBuffer);

          try {
            const savedImagePath = await folder.saveImageToFolder(
              folderPath,
              imageName,
              imageData
            );

            data.image = savedImagePath;
          } catch (error) {
            console.error("Error saving image:", error);
          }
        };

        ProjectService.addProjectService(data)
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
                  setAddProject({
                    project_name: "",
                    description: "",
                    image: "",
                    start_date: "",
                    end_date: "",
                    link: "",
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
    }
  };
  const addNisitExcelHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (select === "option2") {
      const fileInput = document.getElementById(
        "fileInput"
      ) as HTMLInputElement;
      const selectedFile = fileInput.files?.[0];
      setFormSubmitted(true);

      if (!selectedFile) {
        Swal.fire({
          icon: "error",
          title: "failed",
          text: "Please select a file.",
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: "OK",
          allowOutsideClick: true,
        });
      } else {
        setAddNisitExcel("test");
        console.log(addNisit.project_id);
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        NisitService.addNiSitExcelService(formData, addNisit.project_id)
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
                }
              });
            }
            console.log(res);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "failed",
              text: "AddNisit failed! Please try again.",
              showConfirmButton: false,
              showDenyButton: true,
              denyButtonText: "OK",
              allowOutsideClick: true,
            });
            console.log(err);
          });
      }
    } else if (select === "option3") {
      const data: AddNiSitRequest = {
        project_id: addNisit.project_id,
        student_id: addNisit.student_id,
        name: addNisit.name,
        classStudent: addNisit.classStudent,
      };
      if (!e.currentTarget.checkValidity()) {
        e.stopPropagation();
      } else {
        NisitService.addNiSitService(data, addNisit.project_id)
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
                  setAddNisit({
                    project_id: "",
                    student_id: "",
                    name: "",
                    classStudent: "",
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
    }
  };
  const modalShowAddAccount = () => {
    ($("#addAccount") as any).modal("show");
  };

  const modalShowEditAccount = (
    { name, email, branch }: addAccountResponse,
    id: number
  ) => {
    setUpdateId(id);
    setUpdateAccount({
      email: email,
      name: name,
      branch: branch,
    });
    ($("#editAccount") as any).modal("show");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  useEffect(() => {
    getAccount();
    getProject();
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
                      <form
                        className="needs-validation"
                        noValidate
                        onSubmit={addProjectHandler}
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              ชื่อโครงงาน*
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                addProject.project_name === "" && formSubmitted
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="project_name"
                              value={addProject.project_name}
                              onChange={(e) =>
                                setAddProject({
                                  ...addProject,
                                  project_name: e.target.value,
                                })
                              }
                              placeholder="ชื่อโครงงาน"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              รายระเอียด*
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                addProject.description === "" && formSubmitted
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="description"
                              value={addProject.description}
                              onChange={(e) =>
                                setAddProject({
                                  ...addProject,
                                  description: e.target.value,
                                })
                              }
                              placeholder="รายระเอียด"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Link Google From*
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                addProject.link === "" && formSubmitted
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="link"
                              value={addProject.link}
                              onChange={(e) =>
                                setAddProject({
                                  ...addProject,
                                  link: e.target.value,
                                })
                              }
                              placeholder="link"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="customFile">รูปภาพโครงการ*</label>
                            <div className="custom-file">
                              <input
                                type="file"
                                className={`form-control ${
                                  selectedFile === null && formSubmitted
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="image"
                                onChange={handleFileChange}
                                placeholder="รูปภาพ*"
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Date Start:</label>
                            <div
                              className="input-group date"
                              id="reservationdate"
                            >
                              <input
                                type="date"
                                className={`form-control ${
                                  addProject.start_date === "" && formSubmitted
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="start_date"
                                value={addProject.start_date}
                                onChange={(e) =>
                                  setAddProject({
                                    ...addProject,
                                    start_date: e.target.value,
                                  })
                                }
                                placeholder="Date Start"
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Date End:</label>
                            <div
                              className="input-group date"
                              id="reservationdate"
                            >
                              <input
                                type="date"
                                className={`form-control ${
                                  addProject.end_date === "" && formSubmitted
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="end_date"
                                value={addProject.end_date}
                                onChange={(e) =>
                                  setAddProject({
                                    ...addProject,
                                    end_date: e.target.value,
                                  })
                                }
                                placeholder="Date End"
                                required
                              />
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
                              <label htmlFor="customFile">
                                โครงการที่ต้องการเพิ่มข้อมูล*
                              </label>
                              <select
                                className={`form-control  ${
                                  addNisit.project_id === "" && formSubmitted
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="project_id"
                                onChange={(e) =>
                                  setAddNisit({
                                    ...addNisit,
                                    project_id: String(e.target.value),
                                  })
                                }
                                placeholder="เลือกโครงการ"
                                required
                              >
                                <option selected hidden value={0}>
                                  เลือกโครงการ
                                </option>
                                {projectData.map((item) => (
                                  <option value={item.id}>
                                    {item.project_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="customFile">แนบไฟล์ PDF*</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  multiple
                                  // className={`form-control ${
                                  //   addCertificate.file === "" && formSubmitted
                                  //     ? "is-invalid"
                                  //     : ""
                                  // }`}
                                  id=""
                                  placeholder="แนบไฟล์ PDF*"
                                  required
                                />
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
                        <form
                          className="needs-validation"
                          noValidate
                          onSubmit={addNisitExcelHandler}
                        >
                          <div className="card-body">
                            <div className="form-group">
                              <label htmlFor="select">
                                รูปแบบการเพิ่มข้อมูล*
                              </label>
                              <select
                                className="form-control"
                                id="select"
                                value={select}
                                onChange={handleSelectChange}
                              >
                                <option selected hidden value="">
                                  กรุณาเลือกรูปแบบการเพิ่มข้อมูล
                                </option>
                                <option value="option2">
                                  เพิ่มข้อมูลด้วยไฟล์
                                </option>
                                <option value="option3">
                                  เพิ่มข้อมูลรายบุคคล
                                </option>
                              </select>
                            </div>
                            {select === "option2" && (
                              <div className="form-group mb-10">
                                <label htmlFor="customFile">
                                  โครงการที่ต้องการเพิ่มข้อมูล*
                                </label>
                                <select
                                  className={`form-control  ${
                                    addNisit.project_id === "" && formSubmitted
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="project_id"
                                  onChange={(e) =>
                                    setAddNisit({
                                      ...addNisit,
                                      project_id: String(e.target.value),
                                    })
                                  }
                                  placeholder="เลือกโครงการ"
                                  required
                                >
                                  <option selected hidden value={0}>
                                    เลือกโครงการ
                                  </option>
                                  {projectData.map((item) => (
                                    <option value={item.id}>
                                      {item.project_name}
                                    </option>
                                  ))}
                                </select>
                                <label htmlFor="customFile">
                                  แนบไฟล์ excel*
                                </label>
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className={`form-control ${
                                      addNisitExcel.file === "" && formSubmitted
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    id="fileInput"
                                    placeholder="แนบไฟล์ excel*"
                                    required
                                  />
                                </div>
                              </div>
                            )}
                            {select === "option3" && (
                              <div className="form-group">
                                <label htmlFor="customFile">
                                  โครงการที่ต้องการเพิ่มข้อมูล*
                                </label>
                                <select
                                  className={`form-control  ${
                                    addNisit.project_id === "" && formSubmitted
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="project_id"
                                  onChange={(e) =>
                                    setAddNisit({
                                      ...addNisit,
                                      project_id: String(e.target.value),
                                    })
                                  }
                                  placeholder="เลือกโครงการ"
                                  required
                                >
                                  <option selected hidden value={0}>
                                    เลือกโครงการ
                                  </option>
                                  {projectData.map((item) => (
                                    <option value={item.id}>
                                      {item.project_name}
                                    </option>
                                  ))}
                                </select>
                                <label htmlFor="name">ชื่อ*</label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    addNisit.name === "" && formSubmitted
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="name"
                                  value={addNisit.name}
                                  onChange={(e) =>
                                    setAddNisit({
                                      ...addNisit,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="กรอกชื่อ"
                                  required
                                />
                                <div className="form-group">
                                  <label htmlFor="student_id">รหัสนิสิต*</label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      addNisit.student_id === "" &&
                                      formSubmitted
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    id="student_id"
                                    value={addNisit.student_id}
                                    onChange={(e) =>
                                      setAddNisit({
                                        ...addNisit,
                                        student_id: e.target.value,
                                      })
                                    }
                                    placeholder="กรอกรหัสนิสิต"
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="class">สาขา*</label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      addNisit.classStudent === "" &&
                                      formSubmitted
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    id="classStudent"
                                    value={addNisit.classStudent}
                                    onChange={(e) =>
                                      setAddNisit({
                                        ...addNisit,
                                        classStudent: e.target.value,
                                      })
                                    }
                                    placeholder="กรอกสาขา"
                                    required
                                  />
                                </div>
                              </div>
                            )}
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
                                      onClick={() =>
                                        modalShowEditAccount(
                                          {
                                            email: item.email,
                                            name: item.name,
                                            branch: item.branch,
                                          },
                                          item.id
                                        )
                                      }
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
                                            <form
                                              className="needs-validation"
                                              noValidate
                                              onSubmit={editAccountHandler}
                                            >
                                              <div className="card-body">
                                                <div className="form-group">
                                                  <label htmlFor="exampleInputEmail1">
                                                    Name*
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className={`form-control ${
                                                      updateAccount.name ===
                                                        "" && formSubmitted
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    id="name"
                                                    value={updateAccount.name}
                                                    onChange={(e) =>
                                                      setUpdateAccount({
                                                        ...updateAccount,
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
                                                      updateAccount.branch ===
                                                        "" && formSubmitted
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    id="exampleInputEmail1"
                                                    placeholder="branch"
                                                    value={updateAccount.branch}
                                                    onChange={(e) =>
                                                      setUpdateAccount({
                                                        ...updateAccount,
                                                        branch: e.target.value,
                                                      })
                                                    }
                                                    required
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="exampleInputEmail1">
                                                    email*
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className={`form-control ${
                                                      updateAccount.email ===
                                                        "" && formSubmitted
                                                        ? "is-invalid"
                                                        : ""
                                                    }`}
                                                    id="exampleInputEmail1"
                                                    placeholder="email"
                                                    value={updateAccount.email}
                                                    onChange={(e) =>
                                                      setUpdateAccount({
                                                        ...updateAccount,
                                                        email: e.target.value,
                                                      })
                                                    }
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
