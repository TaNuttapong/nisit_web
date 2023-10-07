import CarouselCommon from "../../common/CarouselsCommon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContentLayout from "../../layouts/content";

export default function HomePage() {
  return (
    <ContentLayout
      content={
        <>
          {" "}
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
          </div>
        </>
      }
    />
  );
}
