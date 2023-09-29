/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import {
  getAllListCL,
  getAllListCO,
  getAllListLSP,
  getAllListNSX,
  putCTSP,
  detailCTSP,
  listAnh,
  deleteAnh,
  addAnh,
  getAllMSKCCTSP,
  addAllMSKCCTSP
} from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
import '../../scss/UpdateSanPham.scss';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { postCreate } from 'services/ServiceChatLieu';
import { postCreate as postCa } from 'services/ServiceCoAo';
import MyVerticallyCenteredModal from './AddQuicklyChatLuong';
import AddMSKCCTSP from './AddMSKCCTSP';
import { useRef } from 'react';
import defaultImage from '../../assets/images/default-placeholder.png';
import { Table } from 'react-bootstrap';

function UpdateSanPham() {
  const [listCL, setListCL] = useState([]);
  const [listNSX, setListNSX] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listCA, setListCA] = useState([]);
  const [listMSKCCTSP, setListMSKCCTSP] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCA, setModalShowCA] = useState(false);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const inputRef = useRef(null);

  const [values, setValues] = useState({
    chatLieu: {
      id: ''
    },
    sanPham: {
      ten: '',
      moTa: ''
    },
    loaiSanPham: {
      id: ''
    },
    nhaSanXuat: {
      id: ''
    },
    coAo: {
      id: ''
    },
    soLuong: '',
    giaBan: '',
    trangThai: 1
  });

  const [valuesMSKCCTSP, setValuesMSKCCTSP] = useState({
    chiTietSanPham: {
      id: id
    },
    kichCo: {
      id: ''
    },
    mauSac: {
      id: ''
    },
    soLuong: ''
  });

  console.log(valuesMSKCCTSP);

  const addAllByIdCTSP = async (value) => {
    const res = await addAllMSKCCTSP(value);
    if (res) {
      toast.success('Thêm thành công');
      getAllByIdCTSP(id);
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    addAllByIdCTSP(valuesMSKCCTSP);
  };

  const getAllByIdCTSP = async (id) => {
    const res = await getAllMSKCCTSP(id);
    if (res) {
      setListMSKCCTSP(res.data);
    }
  };

  const anh = async (value) => {
    const res = await addAnh(value);
    if (res) {
      toast.success('Thêm thành công');
      getAllAnh(id);
    }
  };

  const handleAddAnh = (event) => {
    event.preventDefault();

    if (file.length === 0) {
      alert('Vui lòng chọn ít nhất một tệp ảnh.');
      return;
    }

    const formData = new FormData();
    file.forEach((file) => {
      formData.append('files', file);
      formData.append('id', id);
    });

    // Gửi formData đến server để xử lý
    anh(formData);

    setFile([]);
    setPreviewImages([]);
    inputRef.current.value = null;
  };

  const handleDeleteImage = async (idAnh) => {
    const res = await deleteAnh(idAnh);
    if (res) {
      toast.success('Xoá thành công');
      getAllAnh(id);
    }
  };

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFile((prevFiles) => [...prevFiles, ...newFiles]);
    const newPreviewImages = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviewImages) => [...prevPreviewImages, ...newPreviewImages]);
  };

  const getAllAnh = async (id) => {
    const res = await listAnh(id);
    if (res) {
      setImageList(res.data);
    }
  };

  const imagePreviews = previewImages.map((previewImage) => (
    <img className="preview-image d-flex justify-content-around" src={previewImage} alt="Preview" key={previewImage} />
  ));

  const handleClick = () => {
    inputRef.current.click();
  };

  const [valuesCL, setValuesCL] = useState({
    ma: '',
    ten: '',
    trangThai: 0
  });

  const closeModal = () => {
    setModalShowCA(false);
    setModalShow(false);
    getAllList();
    setValuesCL({
      ma: '',
      ten: ''
    });
  };

  const handleSubmitCA = (event) => {
    event.preventDefault();
    postCA(valuesCL);
  };

  useEffect(() => {
    detail(id);
    getAllAnh(id);
    getAllByIdCTSP(id);
  }, [id]);

  const detail = async (idCTSP) => {
    const res = await detailCTSP(idCTSP);
    if (res) {
      setValues(res.data);
    }
  };

  const postCA = async (value) => {
    const res = await postCa(value);
    if (res) {
      toast.success('Add thành công');
      closeModal();
    }
  };

  const handleSubmitCL = (event) => {
    event.preventDefault();
    post(valuesCL);
  };

  const post = async (value) => {
    const res = await postCreate(value);
    if (res) {
      toast.success('Add thành công');
      closeModal();
    }
  };

  useEffect(() => {
    getAllList();
  }, []);

  const putctsp = async (idSP, value) => {
    const res = await putCTSP(idSP, value);
    if (res) {
      toast.success('Thành công');
      navigate('/san-pham/chi-tiet-san-pham');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await putctsp(id, values);
  };

  const getAllList = async () => {
    const resCL = await getAllListCL();
    const resLSP = await getAllListLSP();
    const resCA = await getAllListCO();
    const resNSX = await getAllListNSX();
    if (resCL || resLSP || resCA || resNSX) {
      setListCL(resCL.data);
      setListCA(resCA.data);
      setListLSP(resLSP.data);
      setListNSX(resNSX.data);
    }
  };

  return (
    <div>
      <MainCard>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label className="form-label" htmlFor="trang-thai">
              Tên
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên sản phẩm..."
              value={values.sanPham && values.sanPham.ten ? values.sanPham.ten : ''}
              onChange={(e) =>
                setValues({
                  ...values,
                  sanPham: { ...values.sanPham, ten: e.target.value }
                })
              }
            />
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="trang-thai1">
              Mô tả
            </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Nhập mô tả sản phẩm..."
              rows={3}
              value={values.sanPham && values.sanPham.moTa ? values.sanPham.moTa : ''}
              onChange={(e) =>
                setValues({
                  ...values,
                  sanPham: { ...values.sanPham, moTa: e.target.value }
                })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="trang-thai1">
              Giá bán
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập giá sản phẩm..."
              value={values.giaBan}
              onChange={(e) => setValues({ ...values, giaBan: e.target.value })}
            />
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai2">
              Trạng thái:{' '}
            </label>{' '}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setValues({ ...values, trangThai: e.target.value })}
            >
              <option value="1">Kinh doanh</option>
              <option value="0">Ngừng kinh doanh</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai3">
              Chất liệu{' '}
              <span
                role="button"
                tabIndex={0}
                className="fa-solid"
                onClick={() => setModalShow(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setModalShow(true);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
            </label>{' '}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setValues({
                  ...values,
                  chatLieu: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listCL.map((c) => (
                <option key={c.id} value={c.id} selected={c.id === values.chatLieu.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai5">
              Loại sản phẩm: <i className="fa-solid fa-plus" style={{ cursor: 'pointer' }}></i>
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setValues({
                  ...values,
                  loaiSanPham: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listLSP.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai6s">
              Cổ áo:{' '}
              <span
                role="button"
                tabIndex={0}
                className="fa-solid"
                onClick={() => setModalShowCA(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setModalShowCA(true);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
            </label>{' '}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setValues({
                  ...values,
                  coAo: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listCA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai6">
              Nhà sản xuất: <i className="fa-solid fa-plus" style={{ cursor: 'pointer' }}></i>
            </label>{' '}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setValues({
                  ...values,
                  nhaSanXuat: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listNSX.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleSubmit={handleSubmitCL}
          values={valuesCL}
          setValues={setValuesCL}
        />
        <MyVerticallyCenteredModal
          show={modalShowCA}
          onHide={() => setModalShowCA(false)}
          handleSubmit={handleSubmitCA}
          values={valuesCL}
          setValues={setValuesCL}
        />
      </MainCard>
      <MainCard className="my-3">
        <div className="row">
          <div className="col-10 d-flex align-items-center">
            <h2>Thuộc tính</h2>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <button type="submit" className="btn btn-primary" onClick={() => setShow(true)}>
              Thêm thuộc tính
            </button>
          </div>
          <div className="col-12">
            <Table striped hover className="my-4">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Màu sắc</th>
                  <th>Kích cỡ</th>
                  <th>Số lượng</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listMSKCCTSP.map((d, i) => (
                  <tr key={d.id} className="text-center">
                    <td>{i + 1}</td>
                    <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>
                    </td>
                    <td>{d.kichCo.ten}</td>
                    <td>{d.soLuong}</td>
                    <td>Xoá</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </MainCard>
      <MainCard className="my-3">
        <form onSubmit={handleAddAnh}>
          <div className="justify-content-center">
            {file.length === 0 ? (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleClick();
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={defaultImage} alt="" width={300} />
              </span>
            ) : (
              <div>
                <div className="image-preview-container">{imagePreviews}</div>
              </div>
            )}
            <input type="file" id="fileInput" onChange={handleImageChange} ref={inputRef} multiple style={{ display: 'none' }} />
          </div>
          <div className="justify-content-center">{file ? file.name : 'Chọn ảnh'}</div>
          <div className="justify-content-center">
            <button type="submit" className="btn btn-primary">
              Tải ảnh
            </button>
          </div>
          <h1 className="justify-content-center">Danh sách ảnh</h1>
          <div className="justify-content-center">
            {imageList.length === 0 ? (
              <h1>Không có ảnh</h1>
            ) : (
              <>
                <br />
                <ul style={{ listStyle: 'none', padding: 0 }} className="ull">
                  {imageList.map((image) => (
                    <li
                      key={image.id}
                      style={{
                        position: 'relative',
                        marginBottom: '10px'
                      }}
                    >
                      <img style={{ width: '300px', height: '450px' }} src={`data:image/jpeg;base64,${image.tenBase64}`} alt={image.ma} />
                      <i
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          color: 'red',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                        className="fa-solid fa-trash"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDeleteImage(image.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleDeleteImage(image.id);
                          }
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </form>
      </MainCard>
      <AddMSKCCTSP
        show={show}
        onHide={() => setShow(false)}
        handleSubmit={handleAdd}
        values={valuesMSKCCTSP}
        setValues={setValuesMSKCCTSP}
      />
    </div>
  );
}

export default UpdateSanPham;
