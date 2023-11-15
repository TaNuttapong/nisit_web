import CarouselCommon from "../../common/CarouselsCommon";
import { Image } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContentLayout from "../../layouts/Content";
import { getProjectResponse } from "../../models/responses/ProjectResponseModel";
import { useEffect, useState } from "react";
import ProjectService from "../../services/project_services";
import submit from "../../assets/images/testeeee.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [projectData, setProjectData] = useState<getProjectResponse[]>([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    getProject();
  }, []);

  return (
    <ContentLayout
      content={
        <>
          <div>
            <Row className="bg">
              <Col md={4} className="d-none d-md-block"></Col>
              <CarouselCommon />
              <Col md={4} className="d-none d-md-block"></Col>
            </Row>
            <Row>
              <div className="form-inline  bg-sch right_sch ">
                <h4 className="mr-2">รหัสนิสิต/ชื่อโครงการ</h4>
                <div className="input-group" data-widget="sidebar-search">
                  <input
                    className="form-control form-control-sidebar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-sidebar" type="button">
                      <i className="fas fa-search fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <Col>
                <h1 className="padding">โครงการทั้งหมด</h1>
              </Col>
            </Row>
            {projectData.map((item) => (
              <Row md={4}>
                <Col xs={2} className="text-center">
                  <Image src={item.image} alt="pro" className="h-100 w-80 " />
                </Col>
                <Col>
                  <Row xl={12}>
                    <h1>{item.project_name}</h1>
                  </Row>
                  <Row xl={12} className="mb-4">
                    <h3>{item.description}</h3>
                  </Row>
                  <Row>
                    <a
                      onClick={() =>
                        navigate(`/project/?project_id=${item.id}`)
                      }
                    >
                      <h5>รายละเอียด</h5>
                    </a>
                  </Row>
                  <Row xl={12}>
                    <a href={`https://${item.link}`} target="_blank">
                      <Image src={submit} alt="pro" className="imgtest" />
                    </a>
                  </Row>
                </Col>
              </Row>
            ))}
          </div>
        </>
      }
    />
  );
}
