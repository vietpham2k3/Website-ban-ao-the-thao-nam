/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect } from 'react';
import { searchByTrangThai } from 'services/ServiceDonHang';

function ListDonHang(props) {
  const { data, dataLogin, values, setValues } = props;

  useEffect(() => {
    searchByTT(dataLogin.id, data.trangThai);
  }, []);

  const searchByTT = async (id, values) => {
    const res = await searchByTrangThai(id, values);
    if (res) {
      setValues(res.data);
    }
  };

  console.log(values);

  return (
    <div>
      {values.map((d, i) => (
        <div key={i} className="card-box row">
          <div className="col-md-12">
            <div className=" d-flex justify-content-between">
              <p className="mt-3">Huỷ đơn</p>
              <p className="mt-3">Huỷ đơn</p>
            </div>
            <hr />
          </div>
          <div className="col-md-12">
            <div className="col-md-7">
              {/* <img
                src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                className="img-history rounded-start"
                alt="..."
              /> */}
            </div>
          </div>
          <div className="col-md-12"></div>
        </div>
      ))}
    </div>
  );
}

export default ListDonHang;
