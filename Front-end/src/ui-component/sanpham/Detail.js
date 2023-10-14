/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { detailCTSP, getAllProduct } from '../../services/SanPhamService';
// import { postGH } from 'services/GioHangService';
import { Card, Image } from 'react-bootstrap';
import '../../scss/Detail.scss';
import InputSpinner from 'react-bootstrap-input-spinner';
// import { getAllByIdSP } from '../../services/SanPhamService';
import { getAllKCByIdMSAndIdSP, getAllMSByIdSP, findAllAnhByIdMSAndIdSP } from 'services/ServiceDonHang';
import { Button, ButtonToolbar } from 'rsuite';
import { toast } from 'react-toastify';
function Detail(props) {
  const { id, idSP, idMS } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [val, setVal] = useState(0);
  const [idCTSP, setIdCTSP] = useState(0);
  const thumbnailContainerRef = useRef(null);
  const [listSanPham, setListSanPham] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const idMStest = localStorage.getItem('idMS');
  // eslint-disable-next-line react/prop-types
  const { setProductCount, productCount } = props;

  const handleClick = (idSP) => {
    setVal(idSP);
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
    console.log(idMStest);
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

    const storedListSanPham = JSON.parse(localStorage.getItem('product'));
    if (storedListSanPham) {
      setListSanPham(storedListSanPham);
    }
  }, []);

  // ms kc
  const [activeIdKCMaMau, setActiveIdKCMaMau] = useState('');

  const handleClick2 = (idCTSP, idKCMS) => {
    setActiveIdKCMaMau(idKCMS);
    setIdCTSP(idCTSP);
  };

  const [listKC, setListKC] = useState([]);
  const [listMS, setListMS] = useState([]);

  useEffect(() => {
    // getAllMSKC(idSP);
    getAllMS(idSP);
    // console.log(idSP);
  }, [idSP]);

  useEffect(() => {
    getAllKC(idMS, idSP);
    getAllAnh(idMS, idSP);
    // console.log(idSP);
  }, [idMS, idSP]);

  const getAllKC = async (idMS, idSP) => {
    try {
      const res = await getAllKCByIdMSAndIdSP(idMS, idSP);
      if (res && res.data) {
        setListKC(res.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const navigate = useNavigate();

  const getAllMS = async (id) => {
    const res = await getAllMSByIdSP(id);
    if (res && res.data) {
      setListMS(res.data);
    }
  };

  const [selectedIdMSSP, setSelectedIdMSSP] = useState('');

  const handleChangeId = (idCTSP, idSP, idMS, idMSSP) => {
    setSelectedIdMSSP(idMSSP);
    if (idSP === id) {
      toast.warning('Bạn đang xem ảnh của sản phẩm này');
    } else {
      navigate(`/detail/${idCTSP}/${idSP}/${idMS}`);
      // localStorage.setItem("idMS",idMS);
      getAllAnh(idMS, idSP);
      setVal(0);
      // console.log(id);
    }
  };
  ////////

  const getAllCTSP = async () => {
    const res = await getAllProduct();
    if (res && res.data) {
      setData(res.data);
    }
  };

  const getAllAnh = async (idMS, idSP) => {
    const res = await findAllAnhByIdMSAndIdSP(idMS, idSP);
    if (res && res.data) {
      setImageList(res.data);
      setVal(0);
    }
  };

  useEffect(() => {
    fetchProductDetail(idCTSP === 0 ? id : idCTSP);
  }, [idCTSP]);

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

  const handleDetail = (idCTSP, idSP, idMS) => {
    navigate(`/detail/${idCTSP}/${idSP}/${idMS}`);
    localStorage.setItem('idMS', idMS);
  };

  const handleAddToCart = () => {
    const updatedListSanPham = [
      ...listSanPham,
      {
        id: product.id,
        kichCo: product.kichCo,
        sanPham: product.sanPham,
        mauSac: product.mauSac,
        giaBan: product.giaBan,
        soLuong: quantity,
        tongSoLuong: product.soLuong
      }
    ];
    setListSanPham(updatedListSanPham);
    localStorage.setItem('product', JSON.stringify(updatedListSanPham));
    setProductCount(productCount + quantity);
  };

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
                      ? `data:image/jpeg;base64,${imageList[0] && imageList[0].tenBase64}`
                      : `data:image/jpeg;base64,${imageList[val - 1].tenBase64}`
                  }
                  className="anh1"
                />
                <button className="btns" onClick={handleNext}>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div className="flex_row  d-flex align-items-center justify-content-center" ref={thumbnailContainerRef}>
                {imageList.map((image, index) => (
                  <div className="thumbnailAnh" key={image.id}>
                    <Image
                      className={index === 0 ? 'anh2 clicked' : 'anh2'}
                      src={`data:image/jpeg;base64,${image.tenBase64}`}
                      onClick={() => handleClick(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{product.sanPham.ten}</h3>
              <p style={{ color: 'red', fontWeight: 'bold', fontSize: '30px', lineHeight: '30px' }}>{convertToCurrency(product.giaBan)}</p>
              <br></br>
              <div>
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      fontSize: 17,
                      marginTop: 3
                    }}
                  >
                    Màu sắc:
                  </p>
                  <ButtonToolbar>
                    {listMS.map((d) => {
                      const colorData = d.split(',');
                      const id = colorData[0];
                      const color = colorData[1];
                      const idCTSP = colorData[2];
                      const idSP = colorData[3];

                      const idMSSP = `${id}-${idSP}`;

                      return (
                        <div style={{ marginLeft: 15, height: 30 }} key={id}>
                          {color ? (
                            <Button
                              className="custom-button"
                              onClick={() => {
                                handleChangeId(idCTSP, idSP, id, idMSSP);
                              }}
                              style={{
                                backgroundColor: color,
                                border: idMSSP === selectedIdMSSP ? '2px solid black' : '',
                                width: 35,
                                borderRadius: '10px',
                                cursor: 'pointer',
                                height: 25
                              }}
                              tabIndex={0}
                            >
                              <span style={{ color: idMSSP === selectedIdMSSP ? 'greenyellow' : 'black', fontSize: '15px' }}>
                                {idMSSP === selectedIdMSSP ? '✔' : ''}
                              </span>
                            </Button>
                          ) : (
                            <p>Chưa có màu sắc nào</p>
                          )}
                        </div>
                      );
                    })}
                  </ButtonToolbar>
                </div>
              </div>
              <br></br>
              <div>
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      fontSize: 17,
                      marginTop: 8
                    }}
                  >
                    Kích cỡ:
                  </p>
                  <ButtonToolbar>
                    {listKC.map((d) => {
                      const sizeData = d.split(',');
                      const size = sizeData[0];
                      const idCTSP = sizeData[1];
                      const idMS = sizeData[2];
                      const soLuong = sizeData[4];
                      const idKC = sizeData[5];

                      const idKCMS = `${idKC}-${idMS}`;

                      return (
                        <div style={{ marginLeft: 15, marginBottom: 15 }} key={d.id}>
                          <Button
                            className="custom-button"
                            appearance="ghost"
                            onClick={() => handleClick2(idCTSP, idKCMS)}
                            style={{
                              backgroundColor: idKCMS === activeIdKCMaMau ? 'black' : 'transparent',
                              color: idKCMS === activeIdKCMaMau ? 'white' : 'black',
                              border: idKCMS === activeIdKCMaMau ? '1px solid red' : ''
                            }}
                            disabled={soLuong === '0'}
                          >
                            {size}
                          </Button>
                        </div>
                      );
                    })}
                  </ButtonToolbar>
                </div>
              </div>
              <br></br>

              <div className="product-count">
                <p
                  style={{
                    paddingTop: 12,
                    paddingRight: 15,
                    fontSize: 17
                  }}
                >
                  Số lượng:{' '}
                </p>
                <div className="inputSpinner" style={{ width: 130 }}>
                  <InputSpinner
                    max={product.soLuong}
                    min={1}
                    className="input-spinner"
                    step={1}
                    variant={'dark'}
                    type="real"
                    size="md"
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                  />
                  {product.soLuong <= 10 ? <span style={{ color: 'red' }}>Còn lại: {product.soLuong}</span> : ''}
                </div>
              </div>
              <div className="action">
                <button className="add-to-cart2 btn btn-default" type="button" onClick={() => handleAddToCart()}>
                  Thêm vào giỏ hàng
                </button>
                <button className="add-to-cart1 btn btn-default" type="button">
                  Mua Ngay
                </button>
              </div>
              <h1
                style={{ fontStyle: 'italic', paddingTop: 30, fontSize: 30, fontWeight: 'inherit' }}
                onChange={(event) => setValues({ ...values, moTa: event.target.value })}
              >
                Mô tả
              </h1>
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
                  <Card
                    onClick={() => handleDetail(product.id, product.sanPham.id, product.mauSac.id)}
                    style={{ width: '260px', height: '400px' }}
                  >
                    <Card.Img
                      style={{ textAlign: 'center', width: '260px', height: '300px' }}
                      src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                    />
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
