import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../../../scss/ThongKe.scss';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
//service api
import { doanhThuTongTheoNgay, doanhThuTongTheoThang, doanhThuTongTheoNam } from 'services/ServiceThongKe';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const [ngay, setNgay] = useState(0);
  const [thang, setThang] = useState(0);
  const [nam, setNam] = useState(0);

  const doanhThuTongNgay = async () => {
    const res = await doanhThuTongTheoNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  };

  const doanhThuTongThang = async () => {
    const res = await doanhThuTongTheoThang();
    if (res && res.data) {
      setThang(res.data);
    }
  };

  const doanhThuTongNam = async () => {
    const res = await doanhThuTongTheoNam();
    if (res && res.data) {
      setNam(res.data);
    }
  };

  const handleDoanhThuTongNgay = () => {
    setThang('');
    setNam('');
    if (ngay === '') {
      setNgay(0);
    }
    doanhThuTongNgay();
  };

  const handleDoanhThuTongThang = () => {
    setNgay('');
    setNam('');
    if (thang === '') {
      setThang(0);
    }
    doanhThuTongThang();
  };

  const handleDoanhThuTongNam = () => {
    setNgay('');
    setThang('');
    if (nam === '') {
      setNam(0);
    }
    doanhThuTongNam();
  };

  useEffect(() => {
    handleDoanhThuTongNgay();
  }, []);

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item sx={{ paddingRight: 2 }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largeAvatar,
                          backgroundColor: theme.palette.secondary[800],
                          mt: 1
                        }}
                      >
                        <img src={EarningIcon} alt="Notification" />
                      </Avatar>
                    </Grid>
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: theme.palette.secondary[900],
                          zIndex: 2,
                          position: 'relative'
                        }}
                      >
                        DOANH THU TỔNG
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Avatar
                    className='target-pointer'
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary[200],
                        zIndex: 1
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <div className={`close-icon ${isModalOpen ? 'open' : ''}`}>
                        {isModalOpen ? <CloseIcon fontSize="inherit" /> 
                        : <MoreHorizIcon fontSize="inherit" />}
                      </div>
                    </Avatar>
                    <Menu
                      id="menu-earning-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem className={ngay !== '' ? 'menu-item selected' : 'menu-item'} onClick={handleDoanhThuTongNgay}>
                        Theo ngày
                      </MenuItem>
                      <MenuItem className={thang !== '' ? 'menu-item selected' : 'menu-item'} onClick={handleDoanhThuTongThang}>
                        Theo tháng
                      </MenuItem>
                      <MenuItem className={nam !== '' ? 'menu-item selected' : 'menu-item'} onClick={handleDoanhThuTongNam}>
                        Theo năm
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {ngay !== '' && (
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {convertToCurrency(ngay)}
                      </Typography>
                    )}

                    {thang !== '' && (
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {convertToCurrency(thang)}
                      </Typography>
                    )}

                    {nam !== '' && (
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        {convertToCurrency(nam)}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
