import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';

import '../../scss/MauSac.scss';
import { detailHD } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';

function DonHangCT() {
  const { id } = useParams();

  const [hoaDon, setHoaDon] = useState('');

  useEffect(() => {
    detail(id);
  }, [id]);

  const detail = async (id) => {
    const res = await detailHD(id);
    if (res) {
      setHoaDon(res.hoaDon);
    }
  };

  // useEffect(() => {
  //   getAll();
  // }, []);

  // const getAll = async () => {
  //   const res = await getAllHD();
  //   if (res && res.data) {
  //     setData(res.data.content);
  //   }
  // };

  console.log(hoaDon);

  return (
    <div>
      <MainCard>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="col-12 row">
              <div style={{ display: 'flex', justifyContent: 'center' }} className="card-box">
                <div className="row">
                  <div style={{ display: 'flex', justifyContent: 'start' }} className="col-7 row">
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'brown' }}>
                      Thông Tin Đơn Hàng
                    </h3>
                    <div className="col-1"></div>
                  </div>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-around', justifyItems: 'center' }} className="row">
                  {hoaDon && (
                    <div>
                      <span className="label">Mã Đơn:</span>
                      <span className="value">{hoaDon.diaChi}</span>
                      <br />
                      <span className="label">Người tạo Đơn:</span>
                      <span className="value">Phạm Quốc Việt</span>
                      <br />
                      {/* Các trường dữ liệu khác */}
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default DonHangCT;
