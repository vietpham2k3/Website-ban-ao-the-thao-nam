/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import DonHang from 'views/ban-hang-tai-quay/DonHang';
import { useState } from 'react';
import { getAllHD, addHD } from 'services/ServiceDonHang';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

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

export default function BanHangTaiQuay() {
  const [value, setValue] = useState(0);
  const [values, setValues] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const add = async () => {
    const res = await addHD(); // Sử dụng await để chờ kết quả trả về
    if (res) {
      toast.success('Thêm đơn thành công');
      getAll();
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (values.length >= 8) {
      // Đã đạt đến giới hạn 8 hoá đơn, không cho phép thêm
      toast.error('Không thể tạo quá 8 đơn');
      return;
    }
    add();
  };

  const getAll = async () => {
    const res = await getAllHD(); // Sử dụng await để chờ kết quả trả về
    if (res) {
      setValues(res.data);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {values.map((d, i) => (
              <Tab key={i} label={d.ma} />
            ))}
          </Tabs>
          <Button variant="outline-primary" style={{ border: 'none' }} onClick={handleAdd}>
            <i className="fa-solid fa-plus"></i>
          </Button>
        </Box>
        {values ? (
          values.map((d, i) => (
            <CustomTabPanel key={i} value={value} index={i}>
              <DonHang id={d.id} getAllHD={getAll}></DonHang>
            </CustomTabPanel>
          ))
        ) : (
          <CustomTabPanel>
            <h1>Không có đơn nào</h1>
          </CustomTabPanel>
        )}
      </Box>
    </MainCard>
  );
}
