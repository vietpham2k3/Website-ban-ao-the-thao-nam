/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { getAllCTSPWeb, getAllListCL, getAllListKC, getAllListMS, getAllListCO, getAllListNSX } from 'services/SanPhamService';
// import '../../scss/SanPham.scss';
import '../../scss/ChiTietSanPham.scss';
import ReactPaginate from 'react-paginate';
// Bộ lọc
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Slider from 'react-slider';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const MIN = 0;
const MAX = 10000000;

function ContentSanPham() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [displayedPriceRange, setDisplayedPriceRange] = useState([MIN, MAX]);

  const [selectedCollars, setSelectedCollars] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [collars, setCollars] = useState([]); // Thêm dòng này
  const [manufacturers, setManufacturers] = useState([]);

  //Max khoảng tiền:
  const findMaxPrice = (products) => {
    let maxPrice = 0;
    products.forEach((product) => {
      if (product.giaBan > maxPrice) {
        maxPrice = product.giaBan;
      }
    });
    return maxPrice;
  };

  const [maxPrice, setMaxPrice] = useState(0); // Thêm maxPrice vào trạng thái

  useEffect(() => {
    getAllCTSPWeb(0).then((res) => {
      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
        const maxProductPrice = findMaxPrice(res.data.content);
        setMaxPrice(maxProductPrice); // Cập nhật maxPrice từ danh sách sản phẩm
        setPriceRange([MIN, maxProductPrice]); // Cập nhật khoảng giá ban đầu
        setDisplayedPriceRange([MIN, maxProductPrice]); // Cập nhật displayedPriceRange ban đầu
      }
    });
  }, []);

  useEffect(() => {
    getAllListMS().then((res) => {
      if (res) {
        setColors(res.data);
      }
    });

    getAllListKC().then((res) => {
      if (res) {
        setSizes(res.data);
      }
    });

    getAllListCL().then((res) => {
      if (res) {
        setMaterials(res.data);
      }
    });
    // Lấy dữ liệu cổ áo từ API
    getAllListCO().then((res) => {
      if (res) {
        setCollars(res.data);
      }
    });

    // Lấy dữ liệu nhà sản xuất từ API
    getAllListNSX().then((res) => {
      if (res) {
        setManufacturers(res.data);
      }
    });
    // Gọi hàm lấy dữ liệu sản phẩm ở đây (getAll)
  }, []);

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    const res = await getAllCTSPWeb(page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [data, priceRange, selectedColors, selectedSizes, selectedMaterials, selectedCollars, selectedManufacturers]);

  // Hàm xử lý việc lọc sản phẩm
  const filterProducts = () => {
    const filteredProducts = data.filter((product) => {
      // Lọc theo khoảng giá
      const price = product.giaBan;
      if (price < priceRange[0] || price > priceRange[1]) {
        return false;
      }

      // Lọc theo màu sắc
      if (selectedColors.length > 0 && !selectedColors.includes(product.mauSac.ten)) {
        return false;
      }

      // Lọc theo kích cỡ
      if (selectedSizes.length > 0 && !selectedSizes.includes(product.kichCo.ten)) {
        return false;
      }

      // Lọc theo chất liệu
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.chatLieu.ten)) {
        return false;
      }

      // Lọc theo cổ áo
      if (selectedCollars.length > 0 && !selectedCollars.includes(product.coAo.ten)) {
        return false;
      }

      // Lọc theo nhà sản xuất
      if (selectedManufacturers.length > 0 && !selectedManufacturers.includes(product.nhaSanXuat.ten)) {
        return false;
      }

      return true;
    });

    setFilteredData(filteredProducts);
  };

  // Hàm xử lý khi khoảng giá thay đổi
  const handlePriceRangeChange = (newValues) => {
    setPriceRange(newValues);
    setDisplayedPriceRange(newValues); // Cập nhật displayedPriceRange
  };

  // Hàm xử lý khi chọn màu sắc
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Hàm xử lý khi chọn kích cỡ
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Hàm xử lý khi chọn chất liệu
  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  // Hàm xử lý khi chọn cổ áo
  const handleCollarChange = (collar) => {
    if (selectedCollars.includes(collar)) {
      setSelectedCollars(selectedCollars.filter((c) => c !== collar));
    } else {
      setSelectedCollars([...selectedCollars, collar]);
    }
  };

  // Hàm xử lý khi chọn nhà sản xuất
  const handleManufacturerChange = (manufacturer) => {
    if (selectedManufacturers.includes(manufacturer)) {
      setSelectedManufacturers(selectedManufacturers.filter((m) => m !== manufacturer));
    } else {
      setSelectedManufacturers([...selectedManufacturers, manufacturer]);
    }
  };

  const handlePageClick = (event) => {
    getAll(event.selected);
  };

  function convertToCurrency(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  const navigate = useNavigate();

  const handleDetail = (idCTSP, idSP, idMS) => {
    navigate(`/detail/${idCTSP}/${idSP}/${idMS}`);
    localStorage.setItem('idMS', idMS);
  };

  return (
    <div style={{ paddingTop: 30 }} className="container">
      <div className="row">
        {/* <div className="col-md-3">
          <h4 style={{ textAlign: 'center', marginBottom: '33px' }}>Bộ Lọc</h4>

          <div style={{}}>
            <Accordion defaultActiveKey={['0', '1', '3', '4', '5', '6']}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Giá Tiền</Accordion.Header>
                <Accordion.Body>
                  <div className="box col-auto">
                    <div className="values">
                      <strong>Khoảng giá:</strong>{' '}
                      {convertToCurrency(displayedPriceRange[0]) + ' - ' + convertToCurrency(displayedPriceRange[1])}
                    </div>
                    <Slider className="slider" onChange={handlePriceRangeChange} value={priceRange} min={MIN} max={maxPrice}></Slider>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Màu Sắc</Accordion.Header>
                <Accordion.Body>
                  {colors.map((color, index) => (
                    <Form.Group key={index} className="color-filter" controlId={`colorCheckbox${index}`}>
                      <label className="round-checkbox-container">
                        <input
                          type="checkbox"
                          className="round-checkbox"
                          onChange={() => handleColorChange(color.ten)}
                          checked={selectedColors.includes(color.ten)}
                        />
                        <span className="round-checkmark"></span>
                      </label>
                      <Form className="color-code" style={{ backgroundColor: color.ten }} />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Kích Cỡ</Accordion.Header>
                <Accordion.Body>
                  <div className="button-container">
                    {sizes.map((size, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        className="custom-button"
                        onClick={() => handleSizeChange(size.ten)}
                        active={selectedSizes.includes(size.ten)}
                      >
                        {size.ten}
                      </Button>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Chất Liệu</Accordion.Header>
                <Accordion.Body>
                  {materials.map((material, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`materialCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={material.ten}
                        onChange={() => handleMaterialChange(material.ten)}
                        checked={selectedMaterials.includes(material.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>Cổ Áo</Accordion.Header>
                <Accordion.Body>
                  {collars.map((collar, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`collarCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={collar.ten}
                        onChange={() => handleCollarChange(collar.ten)}
                        checked={selectedCollars.includes(collar.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header>Nhà Sản Xuất</Accordion.Header>
                <Accordion.Body>
                  {manufacturers.map((manufacturer, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`manufacturerCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={manufacturer.ten}
                        onChange={() => handleManufacturerChange(manufacturer.ten)}
                        checked={selectedManufacturers.includes(manufacturer.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div> */}
        <div className="col-md-3">
          <h4 style={{ marginBottom: '33px' }}>Bộ Lọc</h4>
          {/* Phần bộ lọc sản phẩm */}
          <div style={{}}>
            {/* Đặt nội dung bộ lọc ở đây */}

            <Accordion defaultActiveKey={['0', '1', '3', '4', '5', '6']}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Giá Tiền</Accordion.Header>
                <Accordion.Body>
                  <div className="box col-auto">
                    <div className="values">
                      <strong>Khoảng giá:</strong>{' '}
                      {convertToCurrency(displayedPriceRange[0]) + ' - ' + convertToCurrency(displayedPriceRange[1])}
                    </div>
                    <Slider className="slider" onChange={handlePriceRangeChange} value={priceRange} min={MIN} max={maxPrice}></Slider>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="eventKey-material">
                <Accordion.Header>Màu Sắc</Accordion.Header>
                <Accordion.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="color-filters-section">
                    {colors.slice(0, Math.ceil(colors.length / 2)).map((color, index) => (
                      <Form.Group key={index} className="color-filter" controlId={`colorCheckbox${index}`}>
                        <label className=" round-checkbox-container" style={{ display: 'contents', marginLeft: '5px' }}>
                          <input
                            type="checkbox"
                            className="round-checkbox"
                            onChange={() => handleColorChange(color.ten)}
                            checked={selectedColors.includes(color.ten)}
                          />
                          <Form className="color-code" style={{ backgroundColor: color.ten, marginLeft: '10px' }} />
                          <span className="round-checkmark"></span>
                        </label>
                      </Form.Group>
                    ))}
                  </div>
                  <div className="color-filters-section">
                    {colors.slice(Math.ceil(colors.length / 2)).map((color, index) => (
                      <Form.Group key={index} className="color-filter" controlId={`colorCheckbox${index}`}>
                        <label className=" round-checkbox-container" style={{ display: 'contents', marginLeft: '5px' }}>
                          <input
                            type="checkbox"
                            className="round-checkbox"
                            onChange={() => handleColorChange(color.ten)}
                            checked={selectedColors.includes(color.ten)}
                          />
                          <Form className="color-code" style={{ backgroundColor: color.ten, marginLeft: '10px' }} />
                          <span className="round-checkmark"></span>
                        </label>
                      </Form.Group>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Kích Cỡ</Accordion.Header>
                <Accordion.Body>
                  <div className="button-container">
                    {sizes.map((size, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        className="custom-button"
                        onClick={() => handleSizeChange(size.ten)}
                        active={selectedSizes.includes(size.ten)}
                      >
                        {size.ten}
                      </Button>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4" className="eventKey-material">
                <Accordion.Header>Chất Liệu</Accordion.Header>
                <Accordion.Body>
                  {materials.map((material, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`materialCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={material.ten}
                        onChange={() => handleMaterialChange(material.ten)}
                        checked={selectedMaterials.includes(material.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5" className="eventKey-collar">
                <Accordion.Header>Cổ Áo</Accordion.Header>
                <Accordion.Body>
                  {collars.map((collar, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`collarCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={collar.ten}
                        onChange={() => handleCollarChange(collar.ten)}
                        checked={selectedCollars.includes(collar.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6" className="eventKey-manufacturer">
                <Accordion.Header>Nhà Sản Xuất</Accordion.Header>
                <Accordion.Body>
                  {manufacturers.map((manufacturer, index) => (
                    <Form.Group key={index} className="mb-3" controlId={`manufacturerCheckbox${index}`}>
                      <Form.Check
                        type="checkbox"
                        label={manufacturer.ten}
                        onChange={() => handleManufacturerChange(manufacturer.ten)}
                        checked={selectedManufacturers.includes(manufacturer.ten)}
                      />
                    </Form.Group>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        <div className="col-md-9">
          {/* Phần sản phẩm */}
          <div className="row">
            <h3 style={{ textAlign: 'center' }}>Sản Phẩm</h3>
            {filteredData.map((d, i) => (
              <div key={i} className="col-md-4">
                <Card onClick={() => handleDetail(d.id, d.sanPham.id, d.mauSac.id)} style={{ width: '260px', height: '400px' }}>
                  <Card.Img
                    style={{ textAlign: 'center', width: '260px', height: '300px' }}
                    src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                  />
                  <Card.Body>
                    <Card.Title>{d.sanPham.ten}</Card.Title>
                    <Card.Text>
                      <span>{convertToCurrency(d.giaBan)}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination justify-content-center"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentSanPham;
