import CarouselCommon from "../../common/CarouselsCommon";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Image } from "react-bootstrap";
import "../../../public/css/homepage.css";
import pic_1 from "../../assets/images/Pic1.png";
import pic_2 from "../../assets/images/picc_2.png";

export default function HomePage() {
  return (
    <div>
      <Row className="bg ">
        <Col></Col>
        <Col xs={12}>
          <CarouselCommon />
        </Col>
        <Col></Col>
      </Row>
      <Row className="bg-sch">
        <Col xs={5}></Col>
        <Col xs={3} className="right">
          รหัสนิสิต/ชื่อโครงการ
        </Col>
        <Col xs={4}>
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-1  small-input"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="padding">โครงการทั้งหมด</h1>
        </Col>
      </Row>
      <Row className="m-4">
        <Col xs={4}>
          <Image src={pic_1} alt="pro" className="" fluid />
        </Col>
        <Col xs={8}>
          <h1>ชมรมจิตอาสาสิ่งแวดล้อม</h1>
          <h3>
            รายละเอียด................................
            <br />
            .........................................
            <br />
            .........................................
            <br />
            .........................................
          </h3>
          <a href="/">
            <h3>ดาวโหลดเกียรติบัตร....</h3>
          </a>
        </Col>
      </Row>
      <Row className="m-4">
        <Col xs={4}>
          <Image src={pic_2} alt="pro" className="" fluid />
        </Col>
        <Col xs={8}>
          <h1>ชมรมจิตอาสาสิ่งแวดล้อม</h1>
          <h3>
            รายละเอียด................................
            <br />
            .........................................
            <br />
            .........................................
            <br />
            .........................................
          </h3>
          <a href="/">
            <h3>ดาวโหลดเกียรติบัตร....</h3>
          </a>
        </Col>
      </Row>
    </div>
  );
}
