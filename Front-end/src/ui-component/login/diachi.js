// import Anhuser from '../../assets/images/bieutuong.jpg';
// import '../../scss/diachi.scss';
// import Header from 'ui-component/trangchu/Header';
// import Footer from 'ui-component/trangchu/Footer';
// import React, { useState } from 'react';
// import Modal from 'react-modal';

// function DiaChi() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newAddress, setNewAddress] = useState({});

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle the submission of the new address, e.g., send it to the server
//     console.log('New Address:', newAddress);

//     // Close the modal
//     handleCloseModal();
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container">
//         <div className="row">
//           <br></br>
//           <div className="col-2">
//             <ul>
//               <li>
//                 <div className="user-column">
//                   <div className="avatar">
//                     <div className="avatar-image">
//                       <img src={Anhuser} alt="Ảnh đại diện" />
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//             <ul>
//               <li>
//                 <a href="thong-tin_user">
//                   <button className="no-border">Tài khoản của tôi</button>
//                 </a>
//               </li>
//               <li>
//                 <a href="history">
//                   <button className="no-border">Đơn Hàng của tôi</button>
//                 </a>
//               </li>
//               <li>
//                 <a href="diachi">
//                   <button className="no-border">Địa Chỉ</button>
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <button className="no-border">ĐĂNG XUẤT</button>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className="separator"></div>
//           <div className="col-9">
//             <div className="user-details">
//               <h1>Địa Chỉ Của Tôi</h1>
//               <div className="button2">
//                 <button onClick={handleOpenModal}>Thêm Địa Chỉ Mới</button>
//               </div>
//               <br></br>
//               <br></br>
//               <h4>Sổ Địa Chỉ</h4>
//               <p>Đỗ Mạnh Hùng - <span>0968686868</span></p>
//               <p> Huyện Thạch Thất, Hà Nội</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       <Modal isOpen={isModalOpen} contentLabel="Update User Information" className="right-aligned-modal" shouldCloseOnOverlayClick={true}>
//         <div className="modal-content">
//           <h2>Thêm Địa Chỉ Mới</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="input1">
//               <div>
//                 <label htmlFor="name">Tên:</label>
//                 <input type="text" id="name" name="name" onChange={handleInputChange} />
//               </div>
//               <div>
//                 <label htmlFor="sdt">Số Điện Thoại:</label>
//                 <input type="text" id="sdt" name="sdt" onChange={handleInputChange} />
//               </div>
//               <div>
//                 <label htmlFor="address">Địa chỉ:</label>
//                 <input type="text" id="address" name="address" onChange={handleInputChange} />
//               </div>
//               <div>
//                 <div>
//                   <label htmlFor="province">Tỉnh/Thành Phố:</label>
//                   <select id="province" name="province" onChange={handleInputChange}>
//                     <option value="province1">Chọn Tỉnh/Thành</option>
//                     <option value="province1">Province 1</option>
//                     <option value="province2">Province 2</option>
//                     <option value="province3">Province 3</option>
//                   </select>
//                 </div>
//                 <label htmlFor="district">Quận/Huyện:</label>
//                 <select id="district" name="district" onChange={handleInputChange}>
//                   <option value="district1">Chọn Quận/Huyện</option>
//                   <option value="district2">District 2</option>
//                   <option value="district3">District 3</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="country">Phường/Xã:</label>
//                 <select id="country" name="country" onChange={handleInputChange}>
//                   <option value="country1">Chọn Phường/Xã</option>
//                   <option value="country2">Country 2</option>
//                   <option value="country3">Country 3</option>
//                 </select>
//               </div>

//               <div>
//                 <div className="button3">
//                   <button type="submit">Lưu Địa Chỉ</button>
//                   <div className="button4">
//                     <button onClick={handleCloseModal}>Đóng</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default DiaChi;

import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/diachi.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import Modal from 'react-modal';

import React, { useState, useEffect } from 'react';
import { getTP, getQH, getP } from 'services/ApiGHNService'; // Import các hàm gọi API từ nguồn dữ liệu của bạn
// import { login } from 'services/LoginService';
import {  getAllDcKh, addDC } from 'services/KhachHangService';

function DiaChi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({});

  //Địa Chỉ
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

  const [userAddresses, setUserAddresses] = useState([]);

   // Lấy Địa Chỉ
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
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
    setSelectedWardName(event.target.options[event.target.selectedIndex].text);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues((prevValues) => ({
      ...prevValues,
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedDistrictName,
      phuongXa: selectedWardName
    }));

    try {
      const userId = '0989E19A-6CE5-4DB9-9B41-FA35C5335D41'; // Thay thế bằng ID người dùng thực tế
      const newAddressData = {
        userId,
        ...newAddress,
        tinhThanh: selectedProvinceName,
        quanHuyen: selectedDistrictName,
        phuongXa: selectedWardName,
      };
      const response = await addDC(userId, newAddressData);

      if (response.data) {
        // Nếu thêm địa chỉ thành công, cập nhật lại danh sách địa chỉ
        fetchUserAddresses();
        setIsModalOpen(false); // Đóng modal sau khi thêm thành công
      }
    } catch (error) {
      console.error(error);
    }
  };


  //Hiển thị người dùng
  const customerId="0989E19A-6CE5-4DB9-9B41-FA35C5335D41";
// Lấy danh sách địa chỉ của khách hàng bằng ID
const fetchUserAddresses = async () => {
  try {
    const response = await getAllDcKh(customerId);
    if (response.data) {
      setUserAddresses(response.data); // Lưu danh sách địa chỉ của khách hàng vào state
    }
  } catch (error) {
    console.error(error);
  }
}


// Lấy thông tin ban đầu về địa chỉ của người dùng
  useEffect(() => {
    fetchUserAddresses();
    getThanhPho();
  }, []);

  // Lấy danh sách tỉnh, quận và phường (các hàm getThanhPho, getQuanHuyen, và getPhuong vẫn được sử dụng như trong mã trước)
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  

  return (
    <div>
      <Header />
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
              <h1>Địa Chỉ Của Tôi</h1>
              <div className="button2">
                <button onClick={handleOpenModal}>Thêm Địa Chỉ Mới</button>
              </div>
              <h4>Sổ Địa Chỉ</h4>
              {userAddresses.map((address, index) => (
                <div key={index}>
                  <p>
                    {address.name} - <span>{address.sdt}</span>
                  </p>
                  <p>
                    {address.address}, {address.phuongXa}, {address.quanHuyen}, {address.tinhThanh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Modal isOpen={isModalOpen} contentLabel="Update User Information" className="right-aligned-modal" shouldCloseOnOverlayClick={true}>
        <div className="modal-content">
          <h2>Thêm Địa Chỉ Mới</h2>

          <form onSubmit={handleSubmit}>
            <div className="input1">
              <div>
                <label htmlFor="name">Tên:</label>
                <input type="text" id="name" name="name" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="sdt">Số Điện Thoại:</label>
                <input type="text" id="sdt" name="sdt" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="address">Địa chỉ:</label>
                <input type="text" id="address" name="address" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="province">Tỉnh/Thành Phố:</label>
                <select id="province" name="province" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">Chọn tỉnh thành</option>
                  {provinces.map((province) => (
                    <option key={province.ProvinceID} value={province.ProvinceID}>
                      {province.NameExtension[1]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="district">Quận/Huyện:</label>
                <select id="district" name="district" value={selectedDistrict} onChange={handleDistrictChange}>
                  <option value="">Chọn quận huyện</option>
                  {districts.map((district) => (
                    <option key={district.DistrictID} value={district.DistrictID}>
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="country">Phường/Xã:</label>
                <select id="country" name="country" value={selectedWard} onChange={handleWardChange}>
                  <option value="">Chọn phường xã</option>
                  {wards.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <div className="button3">
                  <button type="submit">Lưu Địa Chỉ</button>
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
