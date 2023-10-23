import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
//service api
import { doanhThuTongTheoNgay} from 'services/ServiceThongKe';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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

  const [ngay,setNgay] = useState(0);
  const [thang,setThang] = useState(0);
  const [nam,setNam] = useState(0);


  const doanhThuTongNgay = async () =>{
    const res = await doanhThuTongTheoNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  }

  const doanhThuTongThang = async () =>{
    const res = await doanhThuTongTheoNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  }

  const doanhThuTongNam = async () =>{
    const res = await doanhThuTongTheoNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  }

  useEffect(() => {
    doanhThuTongNgay();
  }, []);


  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                      <MoreHorizIcon fontSize="inherit" />
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
                      <MenuItem >
                       
                        Theo ngày
                      </MenuItem>
                      <MenuItem >
                       
                        Theo tháng
                      </MenuItem>
                      <MenuItem >
                        
                        Theo năm
                      </MenuItem>
                      
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{display: 'flex', justifyContent: "space-between"}}>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{convertToCurrency(ngay)}</Typography>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{convertToCurrency(ngay)}</Typography>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{convertToCurrency(ngay)}</Typography>
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
