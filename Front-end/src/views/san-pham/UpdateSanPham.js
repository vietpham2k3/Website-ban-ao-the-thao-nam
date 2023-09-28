/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// import { Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { getAllListCL, getAllListCO, getAllListLSP, getAllListMS, getAllListNSX, postCTSP, detailCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { postCreate } from 'services/ServiceChatLieu';
import { postCreate as postCa } from 'services/ServiceCoAo';
import MyVerticallyCenteredModal from './AddQuicklyChatLuong';

function UpdateSanPham() {
  const [listCL, setListCL] = useState([]);
  const [listNSX, setListNSX] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listCA, setListCA] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCA, setModalShowCA] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({});

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
  }, [id]);

  const detail = async (idCTSP) => {
    const res = await detailCTSP(idCTSP);
    if (res) {
      setValues(res.data);
    }
  };
  console.log(values);

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

  const postctsp = async (value) => {
    const res = await postCTSP(value);
    if (res) {
      toast.success('Thêm thành công');
      navigate('/san-pham/chi-tiet-san-pham/detail/' + res.data.id);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postctsp(values);
  };

  const getAllList = async () => {
    const resCL = await getAllListCL();
    const resMS = await getAllListMS();
    const resLSP = await getAllListLSP();
    const resCA = await getAllListCO();
    const resNSX = await getAllListNSX();
    if (resCL || resMS || resLSP || resCA || resNSX) {
      setListCL(resCL.data);
      setListMS(resMS.data);
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
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label me-3" htmlFor="trang-thai4">
              Màu sắc: <i className="fa-solid fa-plus"></i>
            </label>{' '}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setValues({
                  ...values,
                  mauSac: {
                    id: e.target.value
                  }
                });
              }}
            >
              {listMS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label className="form-label me-3" htmlFor="trang-thai5">
              Loại sản phẩm: <i className="fa-solid fa-plus" style={{ cursor: 'pointer' }}></i>
            </label>
            <br />
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
          <div className="col-4">
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
            <br />
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
          <div className="col-4">
            <label className="form-label me-3" htmlFor="trang-thai6">
              Nhà sản xuất: <i className="fa-solid fa-plus" style={{ cursor: 'pointer' }}></i>
            </label>{' '}
            <br />
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
          <div className="col-12">
            <input type="file" name="" id="" />
          </div>
        </div>
      </MainCard>
    </div>
  );
}

export default UpdateSanPham;
