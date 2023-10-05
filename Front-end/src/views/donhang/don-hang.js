/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../scss/DonHang.scss';
import { getAllPageDH, findVIP } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';
import { DateRangePicker } from 'rsuite';
import Slider from 'react-slider';
import Select from 'react-select';
import { FormCheck, FormGroup } from 'react-bootstrap';
import { format } from 'date-fns';
import makeAnimated from 'react-select/animated';
import * as XLSX from 'xlsx';

const MIN = 0;
const MAX = 999999999;

const MINSL = 0;
const MAXSL = 999;

function DonHang() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tuNgay, setTuNgay] = useState(null);
  const [denNgay, setDenNgay] = useState(null);
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [loaiDon, setLoaiDon] = useState('');
  const [radioLoai, setRadioLoai] = useState('');
  //select trangThai
  const [selectedOptions, setSelectedOptions] = useState([]);
  //so luong
  const [valuesSL, setValuesSL] = useState([MINSL, MAXSL]);
  // tong tien
  const [valuesTT, setValuesTT] = useState([MIN, MAX]);
  //hien thi
  const [data, setData] = useState([]);

  const animatedComponents = makeAnimated();

  //ngayTao
  const currentDate = new Date();
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

  const optionList = [
    { value: '0', label: 'Đang chờ xác nhận' },
    { value: '1', label: 'Đã xác nhận' },
    { value: '2', label: 'Đã hủy đơn' },
    { value: '3', label: 'Chờ giao hàng' },
    { value: '4', label: 'Đang giao hàng' },
    { value: '5', label: 'Giao hàng thành công' },
    { value: '6', label: 'Giao hàng thất bại' },
    { value: '7', label: 'Thanh toán thành công' }
  ];

  function handleSelect(selectedOptions) {
    setSelectedOptions(selectedOptions);
  }

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    setCurrentPage(page);
    const res = await getAllPageDH(page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  //fillter DH
  const search = async (key, tuNgay, denNgay, minSL, maxSL, minTT, maxTT, trangThai, loaiDon, page = 0) => {
    const res = await findVIP(key, tuNgay, denNgay, minSL, maxSL, minTT, maxTT, trangThai, loaiDon, page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);

      if (res.data.content.length === 0 && currentPage !== 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(page);
      }
    }
  };

  const handleSearchDH = _.debounce(async (page = 0) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    if (term || selectedValues !== 0) {
      search(term, tuNgay, denNgay, valuesSL[0], valuesSL[1], valuesTT[0], valuesTT[1], selectedValues, loaiDon, page);
    } else {
      search('', null, null, valuesSL[0], valuesSL[1], valuesTT[0], valuesTT[1], null, '', '', page);
    }

    if (data.length === 0) {
      setCurrentPage(0);
    }
  }, []);

  useEffect(() => {
    handleSearchDH(currentPage);
  }, [term, tuNgay, denNgay, valuesSL, valuesTT, selectedOptions, loaiDon, currentPage]);

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleRadioChange1 = (e) => {
    setLoaiDon(e.target.value);
    setRadioLoai(e.target.value);
  };

  const handleAllClickLoai = () => {
    setLoaiDon('');
    setRadioLoai('');
  };

  const handleDateChange = (selectedRange) => {
    if (selectedRange && selectedRange[0] && selectedRange[1]) {
      const startDate = format(selectedRange[0], 'dd/MM/yyyy HH:mm aa');
      const endDate = format(selectedRange[1], 'dd/MM/yyyy HH:mm aa');

      setTuNgay(startDate);
      setDenNgay(endDate);
    }
  };

  //Phan trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handlePageClick = (event) => {
    handlePageChange(event.selected);
  };

  //refesh
  const handleRefresh = () => {
    window.location.reload();
  };

  //export
  const handleOnExport = () => {
    const table = document.getElementById('table-to-xls');
    const workbook = XLSX.utils.table_to_book(table);

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const fileName = `Hóa đơn in ngày ${formattedDate.replace(/_/g, '-')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  function formatDate(dateString) {
    if (dateString === null) {
      return '';
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    let meridian = 'AM';

    if (hours >= 12) {
      meridian = 'PM';
      hours = hours % 12; // Chuyển sang định dạng 12 giờ
    }

    // Đảm bảo hiển thị đúng định dạng hh:mm
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${meridian}`;

    return formattedDate;
  }

  return (
    <div>
      <MainCard>
        {/* fillter */}
        <Card>
          <div style={{ height: 280 }} className="w-auto rounded bg-white border shadow p-4">
            <div className="row">
              <div className="box col-auto col-4">
                <div className="values">
                  <strong>Mã đơn hàng hoặc tên khách hàng :</strong>
                </div>
                <div style={{ marginTop: 10 }} className="search">
                  <input
                    style={{ borderRadius: 15, width: 300, height: 30 }}
                    type="text"
                    className="input-search"
                    placeholder="Nhập mã đơn hoặc tên khách hàng cần tìm..."
                    value={term}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="box col-auto col-5">
                <div className="field">
                  <div className="values">
                    <strong>Ngày tạo đơn :</strong>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <DateRangePicker
                      format="dd:MM:yyyy hh:mm aa"
                      showMeridian
                      defaultCalendarValue={[currentDate, nextYear]}
                      onChange={handleDateChange}
                      onClean={() => {
                        setTuNgay(null);
                        setDenNgay(null);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="box col-auto col-3">
                <div className="values">
                  <strong>Tổng tiền:</strong> {convertToCurrency(valuesTT[0]) + ' - ' + convertToCurrency(valuesTT[1])}
                </div>
                <br />
                <Slider className="slider" onChange={setValuesTT} value={valuesTT} min={MIN} max={MAX}></Slider>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="box col-auto col-6">
                <div className="values">
                  <strong>Trạng thái:</strong>
                </div>
                <div className="dropdown-container">
                  <Select
                    options={optionList}
                    components={animatedComponents}
                    placeholder="Chọn trạng thái đơn cần tìm ...."
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>

              <div style={{ marginLeft: 100 }} className="box col-auto col-4">
                <div style={{ marginTop: 5 }} className="values">
                  <strong>Số lượng:</strong> {valuesSL[0] + ' - ' + valuesSL[1]}
                </div>
                <br />
                <Slider className="slider" onChange={setValuesSL} value={valuesSL} min={MINSL} max={MAXSL}></Slider>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="box col-auto col-6">
                <div className="values">
                  <strong>Loại đơn:</strong>
                </div>
                <FormGroup style={{ marginTop: 15 }}>
                  <FormCheck inline>
                    <FormCheck.Input
                      type="radio"
                      name="radioLoai"
                      checked={radioLoai === ''}
                      value=""
                      onClick={handleAllClickLoai}
                      onChange={handleRadioChange1}
                    />
                    <FormCheck.Label style={{ marginLeft: 15 }}>Tất Cả</FormCheck.Label>
                  </FormCheck>

                  <FormCheck inline>
                    <FormCheck.Input type="radio" name="radioLoai" checked={radioLoai === '0'} value="0" onChange={handleRadioChange1} />
                    <FormCheck.Label>Tại Quầy</FormCheck.Label>
                  </FormCheck>

                  <FormCheck inline style={{ marginLeft: 15 }}>
                    <FormCheck.Input type="radio" name="radioLoai" checked={radioLoai === '1'} value="1" onChange={handleRadioChange1} />
                    <FormCheck.Label>Đặt hàng online</FormCheck.Label>
                  </FormCheck>
                </FormGroup>
              </div>

              <div style={{ marginLeft: 320, marginTop: 20 }} className="box col-auto col-2">
                <button
                  onClick={handleRefresh}
                  data-toggle="tooltip"
                  title="Làm mới"
                  style={{
                    background: '#0ad406',
                    borderRadius: '50px',
                    border: '1px solid black',
                    justifyItems: 'center'
                  }}
                  type="button"
                  className="btn btn-labeled shadow-button"
                >
                  <span style={{ marginBottom: '3px', color: 'white' }} className="btn-icon">
                    <i className="fa-solid fa-arrows-rotate fa-spin fa-lg"></i>
                  </span>
                  <span style={{ marginBottom: '3px', color: 'white', marginLeft: '5px' }} className="separator">
                    |
                  </span>
                  <span
                    style={{
                      marginBottom: '3px',
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      marginLeft: '5px'
                    }}
                  >
                    Refresh
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Card>
        <br></br>
        {/* table */}
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <table id="table-to-xls" style={{ textAlign: 'center', alignItems: 'center', cursor: 'pointer' }} className="table table-hover">
              <tr>
                <th>#</th>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>Ngày Tạo Đơn</th>
                <th>Số Luợng</th>
                <th>Tổng tiền</th>
                <th>Trạng Thái</th>
                <th>Loại Đơn</th>
              </tr>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} onClick={() => navigate(`/don-hang/chi-tiet/${d.id}`)}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten_nguoi_nhan}</td>
                    <td>{formatDate(d.ngay_tao)}</td>
                    <td>{d.tong_so_luong}</td>
                    <td>{convertToCurrency(d.tong_tien)}</td>
                    <td style={{ fontSize: '12px', justifyContent: 'center', display: 'flex' }} className="align-middle">
                      {d.trang_thai === 0 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                        >
                          Đang chờ xác nhận
                        </span>
                      )}
                      {d.trang_thai === 1 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-primary status-completed"
                        >
                          Đã xác nhận
                        </span>
                      )}
                      {d.trang_thai === 2 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                        >
                          Đã hủy đơn
                        </span>
                      )}
                      {d.trang_thai === 3 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                        >
                          Chờ giao hàng
                        </span>
                      )}
                      {d.trang_thai === 4 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                        >
                          Đang giao hàng
                        </span>
                      )}
                      {d.trang_thai === 5 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                        >
                          Giao hàng thành công
                        </span>
                      )}
                      {d.trang_thai === 6 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                        >
                          Giao hàng thất bại
                        </span>
                      )}
                      {d.trang_thai === 7 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                        >
                          Thanh toán thành công
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}
                      className="align-middle"
                    >
                      <div style={{ display: 'inline-block', textAlign: 'left' }}>
                        {d.loai_don === 0 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              justifyContent: 'center',
                              justifyItems: 'center',
                              alignItems: 'center',
                              verticalAlign: 'middle',
                              fontWeight: 'bold'
                            }}
                            className="btn btn-labeled shadow-button btn btn-dark status-completed"
                          >
                            Tại Quầy
                          </span>
                        )}
                        {d.loai_don === 1 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              justifyContent: 'center',
                              justifyItems: 'center',
                              verticalAlign: 'middle',
                              alignItems: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#126e3bff',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Đặt Hàng Online
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{d.ten}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages === 0 && currentPage === 0 && (
              <div className="col-sm-12">
                <div
                  style={{ background: 'whitesmoke' }}
                  className="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-28 font__weight-light brk-library-rendered rendered show"
                  role="alert"
                  data-brk-library="component__alert"
                >
                  <div className="start-icon far fa-times-circle faa-pulse animated fa-times">
                    <strong style={{ fontFamily: 'Arial' }} className="font__weight-semibold">
                      Không tìm thấy dữ liệu!
                    </strong>
                  </div>
                </div>
              </div>
            )}

            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< Previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination justify-content-center po"
              activeClassName="active"
            />

            <form style={{ display: 'flex', justifyContent: 'end' }} className="export-form">
              <button
                className="button-85"
                onClick={handleOnExport}
                style={{ border: '1px solid black', background: 'greenyellow', borderRadius: '10px' }}
                data-toggle="tooltip"
                title="In hóa đơn Excel"
                // className="shadow-button"
                type="submit"
              >
                <span style={{ fontSize: '15px', fontWeight: 'bold' }} className="btn-text">
                  In Excel
                </span>
              </button>
            </form>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default DonHang;
