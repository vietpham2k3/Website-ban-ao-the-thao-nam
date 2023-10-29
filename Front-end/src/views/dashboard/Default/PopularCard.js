/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import '../../../scss/ThongKe.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { sanPhamBanChayNgay, sanPhamBanChayThang, sanPhamBanChayNam } from 'services/ServiceThongKe';

import '../../../scss/ThongKe.scss';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
// import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedMenu, setSelectedMenu] = useState('ngay');
  const [ngay, setNgay] = useState([]);
  const [thang, setThang] = useState([]);
  const [nam, setNam] = useState([]);

  const SPBCNgay = async () => {
    const res = await sanPhamBanChayNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  };

  const SPBCThang = async () => {
    const res = await sanPhamBanChayThang();
    if (res && res.data) {
      setThang(res.data);
    }
  };

  const SPBCNam = async () => {
    const res = await sanPhamBanChayNam();
    if (res && res.data) {
      setNam(res.data);
    }
  };

  const handleSPBCNgay = () => {
    SPBCNgay();
    setSelectedMenu('ngay');
  };

  const handleSPBCThang = () => {
    SPBCThang();
    setSelectedMenu('thang');
  };

  const handleSPBCNam = () => {
    SPBCNam();
    setSelectedMenu('nam');
  };

  useEffect(() => {
    handleSPBCThang();
  }, []);

  // function convertToCurrency(number) {
  //   // Chuyển đổi số thành định dạng tiền Việt Nam
  //   const formatter = new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND'
  //   });

  //   return formatter.format(number);
  // }

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
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Sản Phẩm Bán Chạy</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark[500],
                        zIndex: 1
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <div className={`close-icon ${isModalOpen ? 'open' : ''}`}>
                        {isModalOpen ? <CloseIcon fontSize="inherit" /> :
                         <MoreHorizOutlinedIcon fontSize="inherit" />}
                      </div>
                    </Avatar>
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem className={selectedMenu === 'ngay' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCNgay}>
                        Hôm nay
                      </MenuItem>
                      <MenuItem className={selectedMenu === 'thang' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCThang}>
                        Tháng này
                      </MenuItem>
                      <MenuItem className={selectedMenu === 'nam' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCNam}>
                        Năm này
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid> */}
              <Grid item xs={12}>
                <Grid container direction="column"></Grid>
                <br></br>
                {selectedMenu === 'ngay' &&
                  ngay.slice(0, 5).map((n, index) => {
                    const sizeData = n.split(',');
                    const tenSP = sizeData[0];
                    const soLuongSP = sizeData[1];

                    return (
                      <Grid key={index} container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="flex-start">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                <p>
                                  <span>{tenSP}</span>
                                </p>
                              </Typography>
                            </Grid>
                   
                          </Grid>
                          <Grid item>
                              <Grid container alignItems="center" justifyContent="flex-end">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    <p style={{ fontStyle: 'italic' , fontWeight: 'initial', color: "gray"}}>
                                      Đã bán:{' '}
                                      <span style={{ fontStyle: 'revert-layer', fontWeight: 'bolder', color: 'red' }}>{soLuongSP}</span>
                                    </p>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                      </Grid>
                    );
                  })}
                {selectedMenu === 'thang' &&
                  thang.slice(0, 5).map((n, index) => {
                    const sizeData = n.split(',');
                    const tenSP = sizeData[0];
                    const soLuongSP = sizeData[1];

                    return (
                      <Grid key={index} container direction="column">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="flex-start">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                <p>
                                  <span>{tenSP}</span>
                                </p>
                              </Typography>
                            </Grid>
                   
                          </Grid>
                          <Grid item>
                              <Grid container alignItems="center" justifyContent="flex-end">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    <p style={{ fontStyle: 'italic' , fontWeight: 'initial', color: "gray"}}>
                                      Đã bán:{' '}
                                      <span style={{ fontStyle: 'revert-layer', fontWeight: 'bolder', color: 'red' }}>{soLuongSP}</span>
                                    </p>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                      </Grid>
                    );
                  })}
                {selectedMenu === 'nam' &&
                  nam.slice(0, 5).map((n, index) => {
                    const sizeData = n.split(',');
                    const tenSP = sizeData[0];
                    const soLuongSP = sizeData[1];

                    return (
                      <Grid key={index} container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="flex-start">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              <p>
                                <span>{tenSP}</span>
                              </p>
                            </Typography>
                          </Grid>
                 
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="flex-end">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  <p style={{ fontStyle: 'italic' , fontWeight: 'initial', color: "gray"}}>
                                    Đã bán:{' '}
                                    <span style={{ fontStyle: 'revert-layer', fontWeight: 'bolder', color: 'red' }}>{soLuongSP}</span>
                                  </p>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                      </Grid>
                      <Grid item>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                    </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              Tất Cả
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
