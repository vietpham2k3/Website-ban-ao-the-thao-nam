/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import '../../../scss/ThongKe.scss';
// import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { sanPhamBanChayNgay } from 'services/ServiceThongKe';

import '../../../scss/ThongKe.scss';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [ngay, setNgay] = useState([]);

  const SPBCNgay = async () => {
    const res = await sanPhamBanChayNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  };

  const handleSPBCNgay = () => {
    SPBCNgay();
  };

  useEffect(() => {
    handleSPBCNgay();
  }, []);

  // function convertToCurrency(number) {
  //   // Chuyển đổi số thành định dạng tiền Việt Nam
  //   const formatter = new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND'
  //   });

  //   return formatter.format(number);
  // }
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
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
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
                      <MenuItem onClick={handleSPBCNgay}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column"></Grid>
                {ngay.map((n, index) => {
                  const sizeData = n.split(',');
                  // const anh = sizeData[0];
                  const tenSP = sizeData[0];
                  const soLuongSP = sizeData[1];
                  // const giaBan = sizeData[2];
                  // const tienSP = sizeData[3];

                  return (
                    <Grid key={index} container direction="column" style={{ paddingBottom: 25 }}>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              <p>
                                <span>{tenSP}</span>
                              </p>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  <p style={{ fontStyle: 'italic' }}>
                                    Đã bán: <span style={{ fontStyle: 'revert-layer', fontWeight: 'initial' }}>{soLuongSP}</span>
                                  </p>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        {/* <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                          10% loss
                        </Typography> */}
                        {/* <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                      10% Profit
                    </Typography>
                  </Grid> */}
                        <Divider sx={{ my: 1.5 }} />
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
