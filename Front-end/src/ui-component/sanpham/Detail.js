import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { detailCTSP, getAllProduct, listAnh } from '../../services/SanPhamService';
import { Card } from 'react-bootstrap';
import './Detail.scss';
import './product-image-slider.scss';
// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  // const [imageList, setImageList] = useState([]);
  // const [activeThumb, setActiveThumb] = useState();

  // const handleCarouselItemClick = (event) => {
  //   const imgUrl = event.target.getAttribute('data-mdb-img');
  //   setMainImage(imgUrl);
  // };

  useEffect(() => {
    getAllCTSP();
  }, []);

  useEffect(() => {
    getAllAnh(id);
  }, [id]);

  const getAllCTSP = async () => {
    const res = await getAllProduct();
    if (res && res.data) {
      setData(res.data);
    }
  };

  const getAllAnh = async (id) => {
    const res = await listAnh(id);
    if (res) {
      setImageList(res.data);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  const fetchProductDetail = async (id) => {
    try {
      const response = await detailCTSP(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product detail:', error);
    }
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div>
        <p style={{ paddingLeft: 30, fontSize: 20, paddingTop: 30, display: 'flex' }}>
          <Link to="/trang-chu" style={{ color: 'black', textDecorationLine: 'none' }}>
            <p className="trangChu">Trang chủ</p>
          </Link>{' '}
          |{' '}
          <Link to="/san-pham/web" style={{ color: 'black', textDecorationLine: 'none' }}>
            <p className="sanPham">Sản phẩm</p>
          </Link>{' '}
          | {product.sanPham.ten}
        </p>
      </div>
      <hr></hr>
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6" style={{ backgroundColor: 'rgb(255, 255, 255)', display: 'flex' }}>
              <div className="col-6">
                {/* <Swiper
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-slide-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    '--swiper-slide-border-radius': '10px'
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: activeThumb }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    {imageList.map((image) => (
                      <img
                        key={image.id}
                        style={{ width: '300px', height: '450px' }}
                        src={`data:image/jpeg;base64,${image.tenBase64}`}
                        alt={image.ma}
                      />
                    ))}
                  </SwiperSlide>
                </Swiper>
                <Swiper
                  onSwiper={setActiveThumb}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    {imageList.map((image) => (
                      <img
                        key={image.id}
                        style={{ width: '100px', height: '150px' }}
                        src={`data:image/jpeg;base64,${image.tenBase64}`}
                        alt={image.ma}
                      />
                    ))}
                  </SwiperSlide>
                </Swiper> */}
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{product.sanPham.ten}</h3>
              <p style={{ fontStyle: 'italic' }}>Mã sản phẩm: {product.ma}</p>
              <p style={{ color: 'red', fontWeight: 'bold', fontSize: '30px', lineHeight: '30px' }}>{convertToCurrency(product.giaBan)}</p>
              <div style={{ display: 'flex' }}>
                <p style={{ color: 'grey', fontSize: 17, fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif' }}>
                  Màu sắc:
                </p>
                <p style={{ backgroundColor: product.mauSac.ten, color: product.mauSac.ten, width: 30, height: 20, marginLeft: 25 }}>.</p>
              </div>
              <h5
                style={{
                  color: 'grey',
                  fontSize: 17,
                  paddingBottom: 10,
                  fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                }}
                className="sizes"
              >
                Kích cỡ:
                <span className="size" data-toggle="tooltip" title="small">
                  S
                </span>
                <span className="size" data-toggle="tooltip" title="medium">
                  M
                </span>
                <span className="size" data-toggle="tooltip" title="large">
                  L
                </span>
                <span className="size" data-toggle="tooltip" title="xtra large">
                  XL
                </span>
                <span className="size" data-toggle="tooltip" title="xtra large">
                  XXL
                </span>
              </h5>
              <div className="product-count">
                <p
                  style={{
                    color: 'grey',
                    paddingTop: 12,
                    paddingRight: 15,
                    fontSize: 17,
                    fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif'
                  }}
                >
                  Số lượng:{' '}
                </p>
                <button type="button" className="qtyminus" onClick={handleDecreaseQuantity}>
                  -
                </button>
                <input type="number" className="qty textInput" value={quantity} min="1" onChange={handleQuantityChange} />
                <button type="button" className="qtyplus" onClick={handleIncreaseQuantity}>
                  +
                </button>
              </div>
              <div className="action">
                <button className="add-to-cart2 btn btn-default" type="button">
                  Thêm vào giỏ hàng
                </button>
                <button className="add-to-cart1 btn btn-default" type="button">
                  Mua Ngay
                </button>
              </div>
              <label style={{ fontStyle: 'italic', paddingTop: 30, fontSize: 20 }}>Mô tả: {product.sanPham.moTa}</label>
            </div>
          </div>
        </div>
      </div>

      <section className="product">
        <h1 className="title" style={{ padding: 10, fontSize: 30, fontStyle: 'italic' }}>
          Các sản phẩm khác
        </h1>
        <hr></hr>
        <div className="container">
          <div className="row">
            {data.slice(0, 8).map((product, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index}>
                  <Card style={{ width: '260px', height: '400px' }}>
                    <Link to={`/detail/${product.id}`}>
                      <Card.Img
                        style={{ textAlign: 'center', width: '250px', height: '300px' }}
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{product.sanPham.ten}</Card.Title>
                      <Card.Text>
                        <span>{convertToCurrency(product.giaBan)}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Detail;
