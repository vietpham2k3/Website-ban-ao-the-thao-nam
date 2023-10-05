import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { detailCTSP, getAllProduct, listAnh } from '../../services/SanPhamService';
import { Card, Image } from 'react-bootstrap';
import '../../scss/Detail.scss';
import InputSpinner from 'react-bootstrap-input-spinner';

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [val, setVal] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [quantity, setQuantity] = useState(1);

  const handleClick = (id) => {
    setVal(id);
  };

  const handleNext = () => {
    let nextVal = val + 1;
    if (nextVal >= imageList.length + 1) {
      nextVal = 0;
    }
    setVal(nextVal);
    const thumbnailContainer = thumbnailContainerRef.current;
    const thumbnailWidth = thumbnailContainer.offsetWidth / imageList.length;
    const scrollLeft = thumbnailWidth * nextVal;
    thumbnailContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const handlePrevious = () => {
    let prevVal = val - 1;
    if (prevVal < 0) {
      prevVal = imageList.length;
    }
    setVal(prevVal);
    const thumbnailContainer = thumbnailContainerRef.current;
    const thumbnailWidth = thumbnailContainer.offsetWidth / imageList.length;
    const scrollLeft = thumbnailWidth * prevVal;
    thumbnailContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

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
    if (res && res.data) {
      setImageList(res.data);
      setVal(0); // Đặt giá trị ban đầu của val là 0 khi có dữ liệu mới
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
            <div
              className="preview col-md-6 imageDetail"
              style={{ backgroundColor: 'rgb(255, 255, 255)', marginTop: 10, marginBottom: 40 }}
            >
              <div className="actionImage">
                <button className="btns" onClick={handlePrevious}>
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <Image
                  src={
                    val === 0
                      ? `http://localhost:8080/api/chi-tiet-san-pham/${product.id}`
                      : `data:image/jpeg;base64,${imageList[val - 1].tenBase64}`
                  }
                  height="350"
                  width="300"
                />
                <button className="btns" onClick={handleNext}>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div className="flex_row  d-flex align-items-center justify-content-center" ref={thumbnailContainerRef}>
                {imageList.map((image, index) => (
                  <div className="thumbnailAnh" key={image.id}>
                    <Image
                      className={val === index + 1 ? 'clicked' : ''}
                      src={`data:image/jpeg;base64,${image.tenBase64}`}
                      onClick={() => handleClick(index + 1)}
                      height="100"
                      width="100"
                    />
                  </div>
                ))}
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
                <div className="inputSpinner" style={{ width: 110 }}>
                  <InputSpinner
                    min={1}
                    className="input-spinner"
                    step={1}
                    variant={'dark'}
                    type="real"
                    size="md"
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                  />
                </div>
              </div>
              <div className="action">
                <button className="add-to-cart2 btn btn-default" type="button">
                  Thêm vào giỏ hàng
                </button>
                <button className="add-to-cart1 btn btn-default" type="button">
                  Mua Ngay
                </button>
              </div>
              <h1 style={{ fontStyle: 'italic', paddingTop: 30, fontSize: 30, fontWeight: 'inherit' }}>Mô tả</h1>
              <hr></hr>
              <p style={{ fontWeight: 'inherit', paddingBottom: 10 }}>{product.sanPham.moTa}</p>
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
