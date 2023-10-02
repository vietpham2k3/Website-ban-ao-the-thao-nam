import React from 'react';
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import AnhBanner from '../../assets/images/banner11.jpg';
import AnhBanner1 from '../../assets/images/banner22.jpg';
import AnhBanner2 from '../../assets/images/banner33.jpg';

function Banner() {
  return (
    <div>
      <Carousel className="banner" style={{ paddingTop: 20 }}>
        <Carousel.Item interval={1000}>
          <Image src={AnhBanner} className="d-block w-100" alt="Anh1" />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image src={AnhBanner2} className="d-block w-100" alt="Anh2" />
        </Carousel.Item>
        <Carousel.Item>
          <Image src={AnhBanner1} className="d-block w-100" alt="Anh3" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default Banner;
