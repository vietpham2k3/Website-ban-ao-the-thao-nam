import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import '../../scss/SanPham.scss';
import { getAllCTSP } from 'services/SanPhamService';
import '../../scss/SanPham.scss';
import '../../scss/ChiTietSanPham.scss';

import ReactPaginate from 'react-paginate';

// Bộ lọc
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Slider from 'react-slider';
import Button from 'react-bootstrap/Button';

// import Button from 'react-bootstrap/Button';
// import Collapse from 'react-bootstrap/Collapse';

const MIN = 0;
const MAX = 999999;

function ContentSanPham() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [values, setValues] = useState([MIN, MAX]);

  // const [productOpen, setProductOpen] = useState({});

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    const res = await getAllCTSP(page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
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

  return (
    <div>
      <div className="row">
        <div className="col-md-2">
          <h4 style={{ textAlign: 'center', marginBottom: '33px' }}>Bộ Lọc</h4>
          {/* Phần bộ lọc sản phẩm */}
          <div style={{}}>
            {/* Đặt nội dung bộ lọc ở đây */}

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Giá Tiền</Accordion.Header>
                <Accordion.Body>
                  <div className="box col-auto">
                    <div className="values">
                      <strong>Khoảng giá:</strong> {convertToCurrency(values[0]) + ' - ' + convertToCurrency(values[1])}
                    </div>
                    <Slider className="slider" onChange={setValues} value={values} min={MIN} max={MAX}></Slider>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Màu Sắc</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Màu Đen" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Màu Trắng" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Màu Đỏ" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Màu Vàng" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Màu Xanh" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Size</Accordion.Header>
                <Accordion.Body>
                  <div className="button-container">
                    <Button variant="secondary" className="custom-button">
                      s
                    </Button>
                    <Button variant="secondary" className="custom-button">
                      x
                    </Button>
                    <Button variant="secondary" className="custom-button">
                      M
                    </Button>
                  </div>
                  <div className="button-container">
                    <Button variant="secondary" className="custom-button">
                      L
                    </Button>
                    <Button variant="secondary" className="custom-button">
                      XL
                    </Button>
                    <Button variant="secondary" className="custom-button">
                      XXL
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>Chất Liệu</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="100% Cotton" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="90% Cotton" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="80% Cotton" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="60% Cotton" />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className="col-md-10">
          {/* Phần sản phẩm */}
          <div className="row">
            <h3 style={{ textAlign: 'center' }}>Sản Phẩm</h3>
            {data.map((d, i) => (
              <div key={i} className="col-md-3">
                <Card style={{ width: '260px', height: '340px' }}>
                  <Card.Img
                    style={{ textAlign: 'center', width: '250px', height: '260px' }}
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

    // <div>
    //     {data.map((d, i) => (
    //         <tr key={i} className="text-center">
    //             <Card style={{ width: '18rem' }}>
    //                 <Card.Img
    //                     // onClick={() => setProductOpen({ ...productOpen, [d.id]: !productOpen[d.id] })}
    //                     // aria-controls={`example-collapse-text-${d.id}`}
    //                     // aria-expanded={productOpen[d.id]}
    //                     // variant="top"
    //                     src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
    //                 />
    //                 <Card.Body>
    //                     <Card.Title>{d.sanPham.ten}</Card.Title>
    //                     <Card.Text>
    //                         <span>{convertToCurrency(d.giaBan)}</span>
    //                     </Card.Text>

    //                     {/* <Collapse in={productOpen[d.id]} id={`example-collapse-text-${d.id}`}>
    //                         <div id={`example-collapse-text-${d.id}`}>
    //                             <Button variant="primary">Mua Ngay</Button>{' '}
    //                             <Button variant="primary">Thêm Giỏ Hàng</Button>{' '}
    //                         </div>
    //                     </Collapse> */}
    //                 </Card.Body>
    //             </Card>
    //         </tr>
    //     ))}

    //     <ReactPaginate
    //         breakLabel="..."
    //         nextLabel=">"
    //         onPageChange={handlePageClick}
    //         pageRangeDisplayed={3}
    //         pageCount={totalPages}
    //         previousLabel="<"
    //         pageClassName="page-item"
    //         pageLinkClassName="page-link"
    //         previousClassName="page-item"
    //         previousLinkClassName="page-link"
    //         nextClassName="page-item"
    //         nextLinkClassName="page-link"
    //         breakClassName="page-item"
    //         breakLinkClassName="page-link"
    //         containerClassName="pagination justify-content-center"
    //         activeClassName="active"
    //     />
    // </div>
  );
}

export default ContentSanPham;
