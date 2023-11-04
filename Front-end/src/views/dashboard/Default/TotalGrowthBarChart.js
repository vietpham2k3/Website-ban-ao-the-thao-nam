import PropTypes from 'prop-types';

import { Grid, MenuItem,TextField, Typography } from '@mui/material';
import { bieuDoThang } from 'services/ServiceThongKe';
import { useState, useEffect } from 'react';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { BarChart } from '@mui/x-charts/BarChart';
import '../../../scss/Chart.scss';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [selectedMenu, setSelectedMenu] = useState('thang');
  // const [ngay, setNgay] = useState([]);
  const [thang, setThang] = useState(['']);
  // const [nam, setNam] = useState([]);

  // const SPBCNgay = async () => {
  //   const res = await sanPhamBanChayNgay();
  //   if (res && res.data) {
  //     setNgay(res.data);
  //   }
  // };


  const SPBCThang = async () => {
    const res = await bieuDoThang();
    if (res && res.data) {
      setThang(res.data);
    }
    console.log(res.data);
  };
  
  // const SPBCNam = async () => {
  //   const res = await sanPhamBanChayNam();
  //   if (res && res.data) {
  //     setNam(res.data);
  //   }
  // };

  // const handleSPBCNgay = () => {
  //   SPBCNgay();
  //   setSelectedMenu('ngay');
  // };

  const handleSPBCThang = () => {
    SPBCThang();
    setSelectedMenu('thang');
  };

  // const handleSPBCNam = () => {
  //   SPBCNam();
  //   setSelectedMenu('nam');
  // };

  useEffect(() => {
    handleSPBCThang();
  }, []);
  
  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Biểu đồ doanh thu năm 2023</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">2,324.000</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select>
                    {/* <MenuItem className={selectedMenu === 'ngay' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCNgay}>
                        Hôm nay
                      </MenuItem> */}
                    <MenuItem className={selectedMenu === 'thang' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCThang}>
                      Trong tháng
                    </MenuItem>
                    {/* <MenuItem className={selectedMenu === 'nam' ? 'menu-item selected' : 'menu-item'} onClick={handleSPBCNam}>
                        Trong năm
                      </MenuItem> */}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {selectedMenu === 'thang' && (
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: thang.map((item) => {
                        const parts = item.split(',');
                        return parts[0];
                      }),
                      scaleType: 'band'
                    }
                  ]}
                  series={[
                    {
                      data: thang.map((item) => {
                        const parts = item.split(',');
                        return parseFloat(parts[1]);
                      })
                    }
                  ]}
                  width={855}
                  height={532}
                />
              )} 
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
