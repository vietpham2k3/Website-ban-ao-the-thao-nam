import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/diachi.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { count } from 'services/GioHangService';
import { getAllDcKh, addDC, updateDC, detailDC, deleteDC } from 'services/KhachHangService';
import { getTP, getQH, getP } from 'services/ApiGHNService'; // Import các hàm gọi API từ nguồn dữ liệu của bạn
import { toast } from 'react-toastify';

function DiaChi() {

  const customerId = localStorage.getItem('customerId');

  //Giỏ hàng:
  const [productCount, setProductCount] = useState(0);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
  const idGH = localStorage.getItem('idGH') || '';

  useEffect(() => {
    if (!dataLogin) {
      const storedProductList = JSON.parse(localStorage.getItem('product'));
      if (storedProductList) {
        const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);
        setProductCount(totalCount);
      }
    }
    // Kiểm tra nếu idGH không tồn tại thì không gọi countSP
    if (idGH) {
      countSP(idGH);
    }
  }, [dataLogin, idGH]);

  const countSP = async (id) => {
    const res = await count(id);
    if (res) {
      setProductCount(res.data);
    }
  };
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };
  //Địa chỉ
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    getThanhPho();
  }, []);

  const getThanhPho = async () => {
    try {
      const res = await getTP();
      if (res) {
        setProvinces(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value);
      if (res) {
        setDistricts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhuong = async (value) => {
    try {
      const res = await getP(value);
      if (res) {
        setWards(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = async (event) => {
    const provinceId = {
      province_id: event.target.value
    };
    setSelectedProvince(event.target.value);
    setSelectedProvinceName(event.target.options[event.target.selectedIndex].text);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedDistrictName('');
    setSelectedWardName('');
    getQuanHuyen(provinceId);
    setValueDC({ ...valueDC, tinhThanh: event.target.options[event.target.selectedIndex].text });
  };

  const handleDistrictChange = async (event) => {
    const districtId = {
      district_id: event.target.value
    };
    setSelectedDistrict(event.target.value);
    setSelectedDistrictName(event.target.options[event.target.selectedIndex].text);
    setSelectedWard(null);
    setSelectedWardName('');
    getPhuong(districtId);
    setValueDC({ ...valueDC, quanHuyen: event.target.options[event.target.selectedIndex].text });
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
    setSelectedWardName(event.target.options[event.target.selectedIndex].text);
    setValueDC({ ...valueDC, phuongXa: event.target.options[event.target.selectedIndex].text });
  };

  const [valueDC, setValueDC] = useState({
    tinhThanh: '',
    quanHuyen: '',
    phuongXa: '',
    diaChi: ''
  });

  const handleSubmitADD = async (event) => {
    // Tạo đối tượng địa chỉ mới
    event.preventDefault();
    const newAddress = {
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedDistrictName,
      phuongXa: selectedWardName,
      diaChi: valueDC.diaChi
    };
    await addDCKH(customerId, newAddress);
    setIsModalOpen(false);
  };

  const addDCKH = async (customerId, value) => {
    const res = await addDC(customerId, value);
    if (res) {
      toast.success('Thêm thành công !');
      setAddresses([...addresses, res.data]); // Thêm địa chỉ mới vào danh sách hiện có
    }
  };

  const detailDCKH = async (idDC) => {
    const res = await detailDC(idDC);
    if (res) {
      setValueDC(res.data);
    }
  };

  const [idDC, setIdDC] = useState(null);

  const handleSubmitDC = (event) => {
    event.preventDefault();
    if (idDC) {
      updateDCKH(idDC, valueDC);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => {
    setShow1(false);
  };

  const handleShow1 = (id) => {
    setIdDC(id);
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    if (idDC) {
      detailDCKH(idDC);
    }
  }, [idDC]);

  const updateDCKH = async (idDC, value) => {
    if (idDC) {
      const res = await updateDC(idDC, value);
      if (res) {
        toast.success('Cập nhật thành công !');
        setIsUpdateModalOpen(false); // Đóng Modal cập nhật
        getAllDcKh(customerId).then(response => {
          setAddresses(response.data);
        }).catch(error => {
          console.error('Lỗi khi lấy địa chỉ của khách hàng:', error);
        });
      }
    }
  };

  const handleDeleteDC = (customerId) => {
    del(customerId);
  };

  const del = async (customerId) => {
    const res = await deleteDC(customerId);
    if (res) {
      toast.success('Xóa thành công!');
      setAddresses(addresses.filter((address) => address.id !== customerId)); // Loại bỏ địa chỉ khỏi danh sách

    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [addresses, setAddresses] = useState([]);
  const [addresses, setAddresses] = useState([
    {
      tinhThanh: '',
      quanHuyen: '',
      phuongXa: '',
      diaChi: '',
      isDefault: false, // Trường mặc định
    },
  ]);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (customerId) {
      getAllDcKh(customerId).then(response => {
        const addressesData = response.data;
        setAddresses(addressesData);

        // Tìm địa chỉ mặc định
        const defaultAddress = addressesData.find(address => address.isDefault);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }).catch(error => {
        console.error('Lỗi khi lấy địa chỉ của khách hàng:', error);
      });
    }
  }, [customerId]);

  const handleSetDefaultAddress = (address) => {
    setDefaultAddress(address);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseModal1 = () => {
    setIsUpdateModalOpen(false);
  };

  return (

    <div>
      <Header productCount={productCount} toggleSearchInput={toggleSearchInput} showSearchInput={showSearchInput} />
      <div className="container">
        <div className="row">
          <br></br>
          <div className="col-2">
            <ul>
              <li>
                <div className="user-column">
                  <div className="avatar">
                    <div className="avatar-image">
                      <img src={Anhuser} alt="Ảnh đại diện" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <a href="thong-tin_user">
                  <button className="no-border">Tài khoản của tôi</button>
                </a>
              </li>
              <li>
                <a href="history">
                  <button className="no-border">Đơn Hàng của tôi</button>
                </a>
              </li>
              <li>
                <a href="diachi">
                  <button className="no-border">Địa Chỉ</button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="no-border">ĐĂNG XUẤT</button>
                </a>
              </li>
            </ul>
          </div>

          <div className="separator"></div>
          <div className="col-9">
            <div className="user-details">
              <div className="address-header">
                <h1>Địa Chỉ Của Tôi</h1>
                <div className="button2">
                  <button onClick={handleOpenModal}>Thêm Địa Chỉ Mới</button>
                </div>
              </div>
              <br></br>
              <hr></hr>
              <br></br>

              <div>
                <h4>Sổ Địa Chỉ</h4>
                <br></br>
                <br></br>
                <ul style={{ display: 'contents' }}>
                  <li style={{ width: '100%' }}>
                    {addresses.map((address) => (
                      <div
                        key={address.id}>
                        <h7 style={{ paddingLeft: 15, paddingRight: 10 }}>
                          <label style={{ fontSize: 18 }} htmlFor="dc">
                            {' '}
                            {address.diaChi}, {address.phuongXa}, {address.quanHuyen}, {address.tinhThanh}
                          </label>
                        </h7>
                        <div style={{ float: 'right', paddinxgRight: '15px' }}>
                          <button
                            style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer', transition: 'color 0.3s', }}
                            onClick={() => {
                              handleShow1(address.id);
                            }}
                          >
                        <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                          </button>
                          <span style={{ borderLeft: '1px solid #ccc', height: '15px', margin: '0px 10px' }}></span>
                          <button
                            style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}
                            onClick={() => handleDeleteDC(address.id)}
                          >
                        <i style={{ color: '#ff1744' }} className="fa-solid fa-trash"></i>
                          </button>
                          <span style={{ borderLeft: '1px solid #ccc', height: '15px', margin: '0px 10px' }}></span>

                          <button
                            style={{
                              border: 'none',
                              background: 'none',
                              padding: '0',
                              cursor: 'pointer',
                              transition: 'color 0.3s',
                            }}
                            onClick={() => handleSetDefaultAddress(address)}
                          >
                            <i className="bi bi-star">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill={defaultAddress === address ? 'black' : 'currentColor'}
                                className="bi bi-star"
                                viewBox="0 0 16 16"
                                color='gray'
                                style={{ display: 'inline' }}
                              >
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.830-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.950l3.523 3.356-.830 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                              </svg>
                            </i>
                            <span style={{ fontSize: '15px', color: defaultAddress === address ? 'black' : 'gray', transition: 'color 0.3s', marginLeft: '5px' }}>
                              Mặc Định
                            </span>
                          </button>

                        </div>
                        <hr></hr>
                        <br></br>

                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Modal isOpen={isUpdateModalOpen} contentLabel="Update User Information" show={show1} onHide={handleClose1} className="right-aligned-modal" shouldCloseOnOverlayClick={true}>
        <div className="modal-content">
          <h2>Sửa địa chỉ</h2>
          <form onSubmit={handleSubmitDC}>
            <div className="input1">
              <div className="col-md-12">
                <label htmlFor="address" className="text-black" style={{ paddingBottom: 5 }}>
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  className="form-control fct"
                  id="address"
                  value={valueDC.diaChi}
                  onChange={(e) =>
                    setValueDC({
                      ...valueDC,
                      diaChi: e.target.value
                    })
                  }
                  name="address"
                  placeholder="Địa chỉ..."
                />
              </div>
              <div>
                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Tỉnh/Thành Phố
                  </label>
                  <select id="province" className="form-select fsl" value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Chọn tỉnh thành</option>
                    {provinces.map((province) => (
                      <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.NameExtension[1]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Quận Huyện
                  </label>
                  <select
                    id="district"
                    className="form-select fsl"
                    value={selectedDistrict || ''}
                    onChange={(e) => handleDistrictChange(e)}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn quận huyện</option>
                    {districts.map((district) => (
                      <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Phường xã
                  </label>
                  <select
                    id="ward"
                    className="form-select fsl"
                    value={selectedWard || ''}
                    onChange={handleWardChange}
                    disabled={!selectedDistrict || !selectedProvince}
                  >
                    <option value="">Chọn phường xã</option>
                    {wards.map((ward) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="button3">
                  <button type="submit">Lưu Địa Chỉ</button>
                  <div className="button4">
                    <button onClick={handleCloseModal1}>Đóng</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} contentLabel="Update User Information" show={show} onHide={handleClose} className="right-aligned-modal" shouldCloseOnOverlayClick={true}>
        <div className="modal-content">
          <h2>Thêm Địa Chỉ Mới</h2>
          <form onSubmit={handleSubmitADD}>
            <div className="input1">
              <div className="col-md-12">
                <label htmlFor="address" className="text-black" style={{ paddingBottom: 5 }}>
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  className="form-control fct"
                  id="address"
                  value={valueDC.diaChi}
                  onChange={(e) =>
                    setValueDC({
                      ...valueDC,
                      diaChi: e.target.value
                    })
                  }
                  name="address"
                  placeholder="Địa chỉ..."
                />
              </div>
              <div>
                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Tỉnh/Thành Phố
                  </label>
                  <select id="province" className="form-select fsl" value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Chọn tỉnh thành</option>
                    {provinces.map((province) => (
                      <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.NameExtension[1]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Quận Huyện
                  </label>
                  <select
                    id="district"
                    className="form-select fsl"
                    value={selectedDistrict || ''}
                    onChange={(e) => handleDistrictChange(e)}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn quận huyện</option>
                    {districts.map((district) => (
                      <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-12">
                  <label htmlFor="ward" className="form-label">
                    Phường xã
                  </label>
                  <select
                    id="ward"
                    className="form-select fsl"
                    value={selectedWard || ''}
                    onChange={handleWardChange}
                    disabled={!selectedDistrict || !selectedProvince}
                  >
                    <option value="">Chọn phường xã</option>
                    {wards.map((ward) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="button3">
                  <button type="submit" >Lưu Địa Chỉ</button>
                  <div className="button4">
                    <button onClick={handleCloseModal}>Đóng</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default DiaChi;
