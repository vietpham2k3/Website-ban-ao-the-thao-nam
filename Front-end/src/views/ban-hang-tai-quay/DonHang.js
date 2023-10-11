/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../scss/DonHang.scss';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { searchCTSP } from 'services/SanPhamService';
import SearchResult from './SearchResultList';
import { getById, updateSL, deleteHDCT, updateHD, addKM, getKmById, detailHD, thanhToan } from 'services/ServiceDonHang';
import InputSpinner from 'react-bootstrap-input-spinner';
import TableKM from './TableKM';
import { detailKM, getAllKM } from 'services/ServiceKhuyenMai';
import { toast } from 'react-toastify';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, Font, View } from '@react-pdf/renderer';
import myFont from '../../fonts/Roboto Việt Hóa/Roboto-Regular.ttf';

function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const { id, getAll } = props;
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(true);
  const [idHDCT, setIdHDCT] = useState('');
  const [idKM, setIdKM] = useState('');
  const [values, setValues] = useState([]);
  const [dataKM, setDataKM] = useState([]);
  const [valuesSanPham, setValuesSanPham] = useState([]);
  const [dataHDKM, setDataHDKM] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tienThua, setTienThua] = useState(0);
  const [tienGiam, setTienGiam] = useState(0);
  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [tongSoLuong, setTongSoLuong] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [dataDetailHD, setDataDetailHD] = useState({});
  const [dataDetailKM, setDataDetailKM] = useState({});
  Font.register({ family: 'Roboto', src: myFont });
  const [valuesAddKM, setValuesAddKM] = useState({
    khuyenMai: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    tienGiam: 0
  });
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tongTien: '',
    tongTienKhiGiam: '',
    hinhThucThanhToan: {
      id: dataDetailHD.hinhThucThanhToan && dataDetailHD.hinhThucThanhToan.id,
      trangThai: 0,
      tien: 0
    },
    trangThai: 0
  });
  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });
  const styles = StyleSheet.create({
    container: {
      marginLeft: '40px'
    },
    title: {
      paddingTop: '50px',
      paddingBottom: '20px',
      fontSize: '20px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    titleHD: {
      paddingTop: '20px',
      fontSize: '20px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    titleTB: {
      fontSize: '15px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: '10px'
    },
    text: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center'
    },
    textMaHD: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      paddingBottom: '20px'
    },
    textThuocTinh: {
      fontSize: '10px',
      fontFamily: 'Roboto',
      marginBottom: '3px',
      marginTop: '3px'
    },
    table: {
      width: '100%',
      marginLeft: '40px',
      marginRight: '40px'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderTop: '1px solid #EEE',
      marginRight: '40px'
    },
    header: {
      borderTop: 'none'
    },
    bold: {
      fontWeight: 'bold'
    },
    // So Declarative and unDRY 👌
    row1: {
      width: '10%',
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row2: {
      width: '25%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row3: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row4: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row5: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      border: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    colorBlock: {
      width: 30,
      height: 30,
      borderRadius: 10
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    textLeft: {
      fontFamily: 'Roboto',
      fontSize: '13px',
      marginLeft: '40px'
    },
    textRight: {
      fontFamily: 'Roboto',
      fontSize: '15px',
      marginRight: '30px'
    },
    button: {
      color: 'white',
      textDecoration: 'none'
    }
  });

  const InvoiceDocument = () => {
    return (
      <Document>
        <Page>
          <Text style={styles.title}>Sports Shop</Text>
          <Text style={styles.text}>SDT: 0559044158</Text>
          <Text style={styles.text}>Email: sportsshop@gmail.com</Text>
          <Text style={styles.text}>Địa chỉ: Đại Đồng - Tiên Du - Bắc Ninh</Text>
          <Text style={styles.text}>Ngân hàng: Techcombank - STK: 69696969696969</Text>
          <Text style={styles.text}>Chủ tải khoản: Trần Quang Dũng</Text>
          <Text style={styles.titleHD}>HOÁ ĐƠN BÁN HÀNG</Text>
          <Text style={styles.textMaHD}>{dataDetailHD.ma}</Text>

          <div style={styles.container}>
            <Text style={styles.textThuocTinh}>Ngày mua: {formatDate(dataDetailHD.ngayThanhToan)}</Text>
            <Text style={styles.textThuocTinh}>Khách hàng: {dataDetailHD.tenNguoiNhan}</Text>
            <Text style={styles.textThuocTinh}>Địa chỉ: {dataDetailHD.diaChi}</Text>
            <Text style={styles.textThuocTinh}>Số điện thoại: {dataDetailHD.sdt}</Text>
            <Text style={styles.textThuocTinh}>
              Nhân viên bán hàng: {dataDetailHD && dataDetailHD.taiKhoan && dataDetailHD.taiKhoan.ten}
            </Text>
          </div>
          <Text style={styles.titleTB}>DANH SÁCH SẢN PHẨM KHÁCH HÀNG MUA</Text>
          <View style={styles.table}>
            <View style={[styles.row, styles.header]}>
              <Text style={styles.row1}>STT</Text>
              <Text style={styles.row2}>Sản phẩm</Text>
              <Text style={styles.row3}>Số lượng</Text>
              <Text style={styles.row4}>Đơn giá</Text>
              <Text style={styles.row5}>Thành tiền</Text>
            </View>
            {valuesSanPham.map((d, i) => (
              <View key={i} style={[styles.row, styles.header]}>
                <Text style={styles.row1}>{i + 1}</Text>
                <Text style={styles.row2}>
                  {d.chiTietSanPham.sanPham.ten} [{d.chiTietSanPham.kichCo.ten} - {d.chiTietSanPham.mauSac.ten}]
                </Text>
                <Text style={styles.row3}>{d.soLuong}</Text>
                <Text style={styles.row4}>{convertToCurrency(d.donGia)}</Text>
                <Text style={styles.row5}>{convertToCurrency(d.soLuong * d.donGia)}</Text>
              </View>
            ))}
          </View>
          <View>
            <View style={[styles.flexContainer, { paddingTop: '10px' }]}>
              <Text style={styles.textLeft}>Tổng tiền</Text>
              <Text style={styles.textRight}>{convertToCurrency(totalAmount)}</Text>
            </View>
            {dataHDKM.map((d) => (
              <View key={d.id} style={[styles.flexContainer, { color: 'red' }]}>
                <Text style={styles.textLeft}>Tiền giảm</Text>
                <Text style={styles.textRight}>-{convertToCurrency(d.tienGiam)}</Text>
              </View>
            ))}
            <View style={styles.flexContainer}>
              <Text style={styles.textLeft}>Tiền cần thanh toán</Text>
              <Text style={styles.textRight}>{convertToCurrency(dataDetailHD.tongTienKhiGiam)}</Text>
            </View>
            <View style={styles.flexContainer}>
              <Text style={styles.textLeft}>Tiền thừa</Text>
              <Text style={styles.textRight}>{convertToCurrency(tienThua)}</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.text, { paddingTop: '50px' }]}>-------------Cảm ơn quý khách!-------------</Text>
          </View>
        </Page>
      </Document>
    );
  };

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    let count = 0;
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia;
      count += d.soLuong;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
    setTongSoLuong(count);
  }, [valuesSanPham]);

  useEffect(() => {
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      tongTien: totalAmount
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      ...prevValuesUpdateHD.hinhThucThanhToan,
      tongTienKhiGiam: totalAmount - totalGiam
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount, dataKM]);

  useEffect(() => {
    handleSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    findAllKM(id);
    getAllById(id);
    detailHDById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    update(idHDCT, valuesUpdate);
  }, [valuesUpdate]);

  useEffect(() => {
    handleUpdateHD();
  }, [valuesUpdateHD]);

  useEffect(() => {
    getKM(totalAmount);
  }, [totalAmount]);

  useEffect(() => {
    detailMaKM(idKM);
  }, [idKM]);

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
  }, [valuesUpdateHD.hinhThucThanhToan.tien]);

  useEffect(() => {
    if (dataDetailHD.tongTienKhiGiam === 0) {
      toast.error('Mày mà spam là t cho m bay acc fb');
    } else {
      postKM(valuesAddKM);
    }
  }, [valuesAddKM]);

  const detailMaKM = async (id) => {
    const res = await detailKM(id);
    if (res) {
      setDataDetailKM(res.data);
    }
  };

  const findAllKM = async (id) => {
    const res = await getKmById(id);
    if (res) {
      setDataHDKM(res.data);
    }
  };

  const detailHDById = async (id) => {
    const res = await detailHD(id);
    if (res) {
      setDataDetailHD(res.data);
    }
  };

  const handleAddValueKm = (id, tienGiam) => {
    // const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setIdKM(id);
    setValuesAddKM({
      ...valuesAddKM,
      khuyenMai: {
        id: id
      },
      tienGiam: tienGiam
    });
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
    setTienGiam(tienGiam);
    // if (valuesUpdateHD.tongTien <= valuesUpdateHD.tongTienKhiGiam + totalGiam) {
    //   setValuesUpdateHD((prevValuesUpdateHD) => ({
    //     ...prevValuesUpdateHD,
    //     tongTienKhiGiam: prevValuesUpdateHD.tongTienKhiGiam - tienGiam >= 0 ? prevValuesUpdateHD.tongTienKhiGiam - tienGiam : 0
    //   }));
    // }
  };

  const postKM = async (value) => {
    const res = await addKM(value);
    if (res.data === 'Mày thích spam không ?') {
      toast.warning('Bạn đang sử dụng mã giảm giá này');
      return;
    } else {
      detailHDById(id);
      findAllKM(id);
      setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
      const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
      setValuesUpdateHD((prevValuesUpdateHD) => ({
        ...prevValuesUpdateHD,
        ...prevValuesUpdateHD.hinhThucThanhToan,
        tongTienKhiGiam: totalAmount - totalGiam
      }));
      setValuesUpdateHD((prevValuesUpdateHD) => ({
        ...prevValuesUpdateHD,
        tongTienKhiGiam: prevValuesUpdateHD.tongTienKhiGiam - tienGiam >= 0 ? prevValuesUpdateHD.tongTienKhiGiam - tienGiam : 0
      }));
      toast.success('Thêm mã giảm giá thành công');
    }
  };

  const handleUpdateHD = () => {
    updateTTHD(id, valuesUpdateHD);
  };

  const updateTTHD = async (idHD, value) => {
    const res = await updateHD(idHD, value);
    if (res) {
      detailHDById(id);
    }
  };

  const ThanhToanHD = async (idHD) => {
    const res = await thanhToan(idHD);
    if (res) {
      toast.success('Thanh toán thành công');
      getAll();
    }
  };

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
    }
  };

  const getKM = async (tien) => {
    const res = await getAllKM(tien);
    if (res) {
      setDataKM(res.data);
    }
  };

  const handleUpdateSl = (id, idHD, idCTSP, soLuong) => {
    setIdHDCT(id);
    setValuesUpdate({
      ...valuesUpdate,
      chiTietSanPham: {
        id: idCTSP
      },
      hoaDon: {
        id: idHD
      },
      soLuong: soLuong
    });
  };

  const update = async (idHDCT, values) => {
    const res = await updateSL(idHDCT, values);
    if (res) {
      getAllById(id);
    }
  };

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT);
    if (res) {
      getAllById(id);
    }
  };

  const handleSearchUsers = _.debounce(async () => {
    if (inputValue !== '') {
      // Kiểm tra nếu inputValue không rỗng
      const res = await searchCTSP(inputValue, '1', '', '', '');
      if (res && res.data) {
        setValues(res.data.content);
      }
    } else {
      setValues([]); // Nếu inputValue rỗng, đặt giá trị values là một mảng rỗng để không hiển thị dữ liệu
    }
  }, 100);

  const convertToCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(value);
  };

  const handleDelete = (id) => {
    deleteHD(id);
  };

  const handleAddKM = () => {
    setShow(false);
    setActiveIndex(null);
  };

  const handleDivClick = (index) => {
    setActiveIndex(index);
  };

  function formatDate(dateString) {
    if (dateString === null) {
      return ''; // Trả về chuỗi rỗng nếu giá trị là null
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  const handleThanhToan = () => {
    ThanhToanHD(id);
    setValuesUpdateHD({
      ...valuesUpdateHD,
      ...valuesUpdateHD.hinhThucThanhToan,
      trangThai: 6,
      hinhThucThanhToan: {
        tien: tienKhachDua,
        trangThai: 1
      }
    });
  };

  const handleChangeValueTien = (e) => {
    setTienKhachDua(e);
    setValuesUpdateHD({
      ...valuesUpdateHD.hinhThucThanhToan,
      ...valuesUpdateHD,
      hinhThucThanhToan: {
        tien: e,
        trangThai: 0
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="box-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="input-seach"
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          {values.length > 0 && (
            <div className="search-result">
              <SearchResult
                result={values}
                id={id}
                getAllById={getAllById}
                handleSearchUsers={handleSearchUsers}
                setInputValue={setInputValue}
                setValuesSearch={setValues}
              />
            </div>
          )}
          <div className="table-container">
            <Table striped hover className="my-4">
              <tr className="ps-3">
                <th>#</th>
                <th>Mã</th>
                <th>Ảnh</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Tổng tiền</th>
              </tr>
              <tbody>
                {valuesSanPham.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.chiTietSanPham.sanPham.ma}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                        className="product-image"
                        style={{ width: '70px', height: '100px' }}
                      />
                    </td>
                    <td>
                      {d.chiTietSanPham.sanPham.ten} <br /> {d.chiTietSanPham.kichCo.ten} <br />
                      <div style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, width: 30, borderRadius: '10px' }}>&nbsp;</div>
                    </td>
                    <td>
                      <div
                        className="input-spinner"
                        style={{ display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}
                      >
                        <InputSpinner
                          key={d.id} // Đặt key duy nhất cho mỗi InputSpinner
                          type={'real'}
                          max={d.chiTietSanPham.soLuong + d.soLuong}
                          min={1}
                          step={1}
                          value={d.soLuong}
                          onChange={(e) => handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)}
                          variant={'dark'}
                          size="sm"
                        />
                      </div>
                      {d.chiTietSanPham.soLuong < 10 ? (
                        <span style={{ color: 'red' }}>
                          Số sản phẩm còn lại: <strong>{d.chiTietSanPham.soLuong}</strong>
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{convertToCurrency(d.donGia)}</td>
                    <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                    <td>
                      <button onClick={() => handleDelete(d.id)} className="fa-solid fa-trash mx-3"></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-4 thong-tin-ban-hang">
          <div>
            <button type="button" className="btn btn-outline-primary">
              Chọn khách hàng
            </button>
            <button className="fa-solid fa-plus mx-3"></button>
          </div>
          <br /> <br />
          <div className="ma-giam-gia">
            <div>
              <h6>Tên khách hàng</h6>
            </div>
            <div>
              <p>
                <input type="text" style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }} />{' '}
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Số điện thoại</h6>
            </div>
            <div>
              <p>
                <input type="text" style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }} />{' '}
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Mã giảm giá</h6>
            </div>
            <div>
              <p>
                <input
                  type="text"
                  style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                  defaultValue={dataDetailKM && dataDetailKM.ma}
                />{' '}
                <button className="fa-solid fa-plus" onClick={() => setShow(true)}></button>
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Số lượng sản phẩm</h6>
            </div>
            <div>
              <p>{tongSoLuong}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tổng tiền</h6>
            </div>
            <div>
              <p>{convertToCurrency(totalAmount)}</p>
            </div>
          </div>
          {dataHDKM.map((d) => (
            <div key={d.id} className="ma-giam-gia" style={{ color: 'red' }}>
              <div>
                <h6>Tiền giảm</h6>
              </div>
              <div>
                <p>-{convertToCurrency(d.tienGiam)}</p>
              </div>
            </div>
          ))}
          <div className="ma-giam-gia">
            <div>
              <h5>Khách phải trả</h5>
            </div>
            <div>
              <p style={{ fontSize: 'large', fontWeight: 'bold' }}>{convertToCurrency(dataDetailHD.tongTienKhiGiam)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền khách đưa</h6>
            </div>
            <div>
              <input
                type="number"
                style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                onChange={(e) => handleChangeValueTien(e.target.value)}
              />
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <select className="form-select" aria-label="Default select example">
                <option selected>Tiền mặt</option>
                <option defaultValue="1">QR</option>
              </select>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền thừa</h6>
            </div>
            <div>
              <p>{convertToCurrency(tienThua)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            {dataKM.map((d, i) => (
              <div key={i} className={`col-10 card-voucher card-width`} onClick={() => handleDivClick(i)} style={{ cursor: 'pointer' }}>
                <h6 style={{ color: 'red', wordWrap: 'break-word' }}>
                  Giảm {convertToCurrency(d.mucGiam)} cho đơn tối thiểu {convertToCurrency(d.tien)}
                </h6>
                <div className="text-voucher">
                  <p style={{ fontSize: '13px', color: 'gray' }}>HSD: {formatDate(d.thoiGianKetThuc)}</p>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddValueKm(d.id, d.mucGiam)}
                    // disabled={true} // Thêm disabled vào đây
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
          <input type="checkbox" checked={check === true} onChange={() => setCheck(!check)} className="me-2" />
          In hoá đơn
          <div className="button-thanh-toan">
            {check ? (
              <button
                type="button"
                className="btn btn-success"
                disabled={tienThua < 0 || tienKhachDua === 0}
                onClick={() => handleThanhToan()}
              >
                <PDFDownloadLink document={<InvoiceDocument />} fileName="hoa_don.pdf">
                  <Text style={styles.button}>Thanh toán</Text>
                </PDFDownloadLink>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                disabled={tienThua < 0 || tienKhachDua === 0}
                onClick={() => handleThanhToan()}
              >
                Thanh toán
              </button>
            )}
          </div>
        </div>
      </div>
      <TableKM
        show={show}
        handleClose={() => setShow(false)}
        dataKM={dataKM}
        convertToCurrency={convertToCurrency}
        handleDivClick={handleDivClick}
        activeIndex={activeIndex}
        handleAddKM={handleAddKM}
        formatDate={formatDate}
      ></TableKM>
    </div>
  );
}

export default DonHang;
