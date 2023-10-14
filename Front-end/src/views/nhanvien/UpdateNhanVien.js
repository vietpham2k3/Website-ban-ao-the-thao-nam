/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';
import { detailNV, vaitro } from 'services/NhanVienService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateNhanVien() {
  const [vaiTroS, setVaiTroS] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: '',
    ten: '',
    sdt: '',
    email: '',
    diaChi: '',
    ngaySinh: '',
    matKhau: '',
    vaiTro: '',
    trangThai: ''
  });

  const [anh, setAnh] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const updateKHFormData = async (ids, formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/nhanvien/update/${ids}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('ten', values.ten);
    formData.append('sdt', values.sdt);
    formData.append('email', values.email);
    formData.append('diaChi', values.diaChi);
    formData.append('ngaySinh', values.ngaySinh);
    formData.append('matKhau', values.matKhau);
    formData.append('vaiTro', values.vaiTro);
    formData.append('trangThai', values.trangThai);
    formData.append('anh', anh);

    try {
      const res = await updateKHFormData(id, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        navigate('/nhan-vien');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật khách hàng');
    }
  };

  const handlePreviewAnh = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAnh(file);
  };

  const detail = async (id) => {
    const res = await detailNV(id);
    if (res) {
      const { ngaySinh, ...values } = res.data;
      setValues({
        ...values,
        ngaySinh: formatDate(ngaySinh)
      });
    }
  };

  useEffect(() => {
    getAllVaiTro();
  }, []);

  const getAllVaiTro = async () => {
    let res = await vaitro();
    if (res) {
      setVaiTroS(res.data);
    }
  };

  // const update = async (id, value) => {
  //   const res = await updateKH(id, value);
  //   if (res) {
  //     toast.success("Update succses!");
  //     navigate("/khach-hang");
  //   }
  // };
  console.log(values);

  const formatDate = (date) => {
    const formattedDate = new Date(parseInt(date, 10)).toISOString().slice(0, 10);
    return formattedDate;
  };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="ma" className="form-label">
                  Mã Nhân Viên
                </label>
                <input
                  id="ma"
                  type="text"
                  disabled
                  className="form-control"
                  value={values.ma}
                  onChange={(e) => setValues({ ...values, ma: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="tenNhanVien" className="form-label">
                  Tên Nhân Viên
                </label>
                <input
                  id="tenNhanVien"
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="sdt" className="form-label">
                  Số Điện Thoại
                </label>
                <input
                  id="sdt"
                  type="text"
                  className="form-control"
                  value={values.sdt}
                  onChange={(e) => setValues({ ...values, sdt: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="diaChi" className="form-label">
                  Địa Chỉ
                </label>
                <input
                  id="diaChi"
                  type="text"
                  className="form-control"
                  value={values.diaChi}
                  onChange={(e) => setValues({ ...values, diaChi: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="ngaySinh" className="form-label">
                  Ngày Sinh
                </label>
                <input
                  id="ngaySinh"
                  type="date"
                  className="form-control"
                  value={values.ngaySinh}
                  onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="matKhau" className="form-label">
                  Mật khẩu
                </label>
                <input
                  id="matKhau"
                  type="text"
                  className="form-control"
                  value={values.matKhau}
                  onChange={(e) => setValues({ ...values, matKhau: e.target.value })}
                />
              </div>

              <div className="col-6">
                <label htmlFor="vaiTro">Vai Trò: </label>
                <select
                  id="vaiTro"
                  className="form-select"
                  aria-label="Default select example"
                  value={values.vaiTro.id}
                  onChange={(e) => setValues({ ...values, vaiTro: e.target.value })}
                >
                  <option>Chọn mã khách hàng</option>
                  {vaiTroS.map((d, i) => (
                    <option key={i} value={d.id} selected={d.id === values.vaiTro.id}>
                      {d.ten}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Ảnh
                </label>
                <input type="file" id="anh" className="form-control" name="anh" onChange={handlePreviewAnh} />
                {anh && <img src={anh.preview} alt="" width="70%"></img>}
              </div>

              {/* <div className="col-6">
              <label htmlFor="a" className="form-label">
                Ảnh
              </label>
              <input type="file" id="anh" className="form-control" name="anh" onChange={handlePreviewAnh} />
              {anh && <img src={anh.preview} alt="" width="70%"></img>}
            </div> */}

              <div className="col-12">
                <label htmlFor="a" className="form-label me-3">
                  Trạng thái:{' '}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={values.trangThai === 0}
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    checked={values.trangThai === 1}
                    onChange={() => setValues({ ...values, trangThai: 1 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Không hoạt động
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </MainCard>
  );
}

export default UpdateNhanVien;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// import Card from "@mui/material/Card";

// // React components
// import SoftBox from "components/SoftBox";

// import { updateNV, detailNhanVien } from "service/ServiceNhanVien";
// import { vaitro } from "service/ServiceNhanVien";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import { Button } from "react-bootstrap";

// function UpdateNhanVien() {

//     const navigate = useNavigate();

//     const [vaiTroS, setVaiTroS] = useState([]);

//     const [values, setValues] = useState(
//     {
//       ma: "",
//       ten: "",
//       sdt: "",
//       email: "",
//       diaChi: "",
//       ngaySinh: "",
//       matKhau: "",
//       vaiTro: "",
//       trangThai: "",
//       anh: "",
//     }
//   );

//   const { id } = useParams();

//   useEffect(() => {
//     detail(id);
//   }, [id]);

//   const detail = async (id) => {
//     const res = await detailNhanVien(id);
//     if (res) {
//       setValues(res.data);
//     }
//   };

//   const put = async (id, value) => {
//     const res = await updateNV(id, value);
//     if (res) {
//       toast.success("Cập nhật thành công !");
//       navigate("/nhan-vien");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     put(id,values);
//   };

//   useEffect(() => {
//     getAllVaiTro()
//   }, [])

//   const getAllVaiTro = async () => {
//     let res = await vaitro()
//     if (res) {
//       setVaiTroS(res.data);
//     }
//   }
//   return (

//     <div>
//     <DashboardLayout>
//           <DashboardNavbar />
//           <SoftBox py={3}>
//             <SoftBox mb={3}>
//             <Card >

//             <div className="body flex-grow-1 px-3">
//                 <form className="row g-3" onSubmit={handleSubmit}>

//                 <div className="mb-2">
//             <label htmlFor="name">Mã: </label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Enter Name"
//               value={values.ma}
//               onChange={(e) => setValues({ ...values, ma: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="name">Tên: </label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Enter Name"
//               value={values.ten}
//               onChange={(e) => setValues({ ...values, ten: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="email">SDT: </label>
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={values.sdt}
//               onChange={(e) => setValues({ ...values, sdt: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="email">Email: </label>
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={values.email}
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="email">Địa Chỉ: </label>
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={values.diaChi}
//               onChange={(e) => setValues({ ...values, diaChi: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="email">Ngày Sinh: </label>
//             <input
//               type="date"
//               name="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={values.ngaySinh}
//               onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
//             />
//           </div>

//           <div className="mb-2">
//             <label htmlFor="email">Mật Khẩu: </label>
//             <input
//               type="text"
//               name="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={values.matKhau}
//               onChange={(e) => setValues({ ...values, matKhau: e.target.value })}
//             />
//           </div>
//           <div className="mb-2">
//             <label>Vai Trò: </label>
//             <select
//               className="form-select"
//               aria-label="Default select example"
//               value={values.vaiTro.id}
//               onChange={(e) => setValues({ ...values, vaiTro: e.target.value })}
//             >
//               <option>Chọn mã khách hàng</option>
//               {vaiTroS.map((nv, i) => (
//                 <option key={i} value={nv.id}>
//                   {nv.ten}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-2">
//             <label>Trạng Thái: </label>
//             <div className="form-check">
//               <input className="form-check-input" type="radio" onChange={() => {
//                 setValues({ ...values, trangThai: 0 });
//               }} checked={values.trangThai === 0} value={values.trangThai} />
//               <label className="form-check-label" htmlFor="flexRadioDefault1">
//               Đang kích hoạt
//               </label>
//             </div>
//             <div className="form-check">
//               <input className="form-check-input" type="radio" onChange={() => {
//                 setValues({ ...values, trangThai: 1 });
//               }} checked={values.trangThai === 1} value={values.trangThai} />
//               <label className="form-check-label" htmlFor="flexRadioDefault2">
//               Ngừng kích hoạt
//               </label>
//             </div>
//           </div>
//                   <div className="col-12">
//                     <Button type="submit" className="btn btn-bg-info">
//                       Update
//                     </Button>
//                     <Link to="/nhan-vien" className="btn btn-primary ms-3">
//                     Back
//                   </Link>
//                   </div>
//           </form>
//           </div>
//             </Card>
//           </SoftBox>
//           </SoftBox>
//           <Footer />
//         </DashboardLayout>
//         </div>
//   );
// }

// export default UpdateNhanVien;
