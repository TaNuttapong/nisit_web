import { Carousel, Image } from "react-bootstrap";
import pic1 from "../assets/images/cal-1.png";
import pic2 from "../assets/images/cal-2.png";
import pic3 from "../assets/images/cal-3.png";
import "/web/nisit_web/public/css/homepage.css";

export default function CarouselCommon() {
  return (
    <Carousel>
      <Carousel.Item className="text-center">
        <Image src={pic1} alt="pro" className="h-100 w-50 " />
      </Carousel.Item>
      <Carousel.Item className="text-center">
        <Image src={pic2} alt="pro" className="h-100 w-50 " />
      </Carousel.Item>
      <Carousel.Item className="text-center">
        <Image src={pic3} alt="pro" className="h-100 w-50 " />
      </Carousel.Item>
    </Carousel>
  );
}
