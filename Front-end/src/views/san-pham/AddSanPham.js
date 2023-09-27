import React from 'react';
import { Card } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';

function AddSanPham() {
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
  return (
    <div>
      <MainCard>
        <Card>
          <form className="row g-3">
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
            {/* <div className="col-6">
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
                    {c.tenMauSac}
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
            </div> */}
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
