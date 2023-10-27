/* eslint-disable react-hooks/exhaustive-deps */
import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListDonHang from './ListDonHang';
import { useState } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function History() {
  const [value, setValue] = useState(0);
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
  const [data, setData] = useState([]);
  const tabs = [
    { title: 'Tất cả', trangThai: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
    { title: 'Chờ xác nhận', trangThai: [0] },
    { title: 'Đang giao', trangThai: [1, 3, 4, 5, 8, 9, 10, 11, 12, 13] },
    { title: 'Hoàn thành', trangThai: [7] },
    { title: 'Huỷ đơn', trangThai: [2] },
    { title: 'Trả hàng', trangThai: [14] }
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
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
              <li>
                <a href="#">
                  <button className="no-border"></button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="no-border"></button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-9">
            <div className="user-details">
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" variant="fullWidth">
                    {tabs.map((d, i) => (
                      <Tab key={i} label={d.title} />
                    ))}
                  </Tabs>
                </Box>
                {tabs ? (
                  tabs.map((d, i) => (
                    <CustomTabPanel key={i} value={value} index={i}>
                      <ListDonHang data={d} dataLogin={dataLogin} values={data} setValues={setData}></ListDonHang>
                    </CustomTabPanel>
                  ))
                ) : (
                  <CustomTabPanel>
                    <h1>Không có đơn nào</h1>
                  </CustomTabPanel>
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
