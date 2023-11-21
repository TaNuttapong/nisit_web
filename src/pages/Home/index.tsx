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
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
            {projectData.map(
              (item, index) =>
                index % 4 === 0 && (
                  <Row key={index}>
                    {projectData.slice(index, index + 4).map((project) => (
                      <Col
                        key={project.id}
                        md={3}
                        style={{ textAlign: "-webkit-center" }}
                      >
                        <Card style={{ width: "80%" }}>
                          <Card.Img variant="top" src={project.image} />
                          <Card.Body>
                            <Card.Title>{project.project_name}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Button
                              onClick={() =>
                                navigate(`/project/?project_id=${project.id}`)
                              }
                            >
                              รายละเอียด
                            </Button>
                            <a
                              onClick={() =>
                                navigate(`/project/?project_id=${project.id}`)
                              }
                            >
                              <h5>รายละเอียด</h5>
                            </a>
                            <a href={`https://${project.link}`} target="_blank">
                              <Image
                                src={submit}
                                alt="pro"
                                className="imgtest"
                              />
                            </a>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )
            )}
          </div>
        </>
      }
    />
  );
}
