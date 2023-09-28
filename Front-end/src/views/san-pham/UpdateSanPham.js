/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { getAllListCL, getAllListCO, getAllListLSP, getAllListMS, getAllListNSX, postCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function AddSanPham() {
  const [listCL, setListCL] = useState([]);
  const [listNSX, setListNSX] = useState([]);
  const [listMS, setListMS] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listCA, setListCA] = useState([]);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    chatLieu: {
      id: ''
    },
    sanPham: {
      ten: '',
      moTa: ''
    },
    mauSac: {
      id: ''
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
      if (resCL.data.length > 0 || resMS.data.length > 0 || resCA.data.length > 0 || resLSP.data.length > 0 || resNSX.data.length > 0) {
        setValues({
          ...values,
          chatLieu: {
            id: resCL.data[0].id
          },
          mauSac: {
            id: resMS.data[0].id
          },
          coAo: {
            id: resCA.data[0].id
          },
          loaiSanPham: {
            id: resLSP.data[0].id
          },
          nhaSanXuat: {
            id: resNSX.data[0].id
          }
        });
      }
    }
  };

  return (
    <div>
      <MainCard>
        <Card>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label className="form-label" htmlFor="trang-thai">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên sản phẩm..."
                value={values.sanPham.ten}
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
                value={values.sanPham.moTa}
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
              <br />
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
                Chất liệu:{' '}
              </label>{' '}
              <br />
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
                Màu sắc:{' '}
              </label>{' '}
              <br />
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
                Loại sản phẩm:{' '}
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
                Nhà sản xuất:{' '}
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
                Add
              </button>
            </div>
          </form>
        </Card>
      </MainCard>
    </div>
  );
}

export default AddSanPham;
