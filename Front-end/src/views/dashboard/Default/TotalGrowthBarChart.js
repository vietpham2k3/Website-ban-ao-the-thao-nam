import PropTypes from 'prop-types';

import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { bieuDoNam, bieuDoNgay, bieuDoThang } from 'services/ServiceThongKe';
import { useState, useEffect } from 'react';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
import { BarChart } from '@mui/x-charts/BarChart';
import '../../../scss/Chart.scss';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {

  const [selectedMenu, setSelectedMenu] = useState('nam');
  const [ngay, setNgay] = useState(['']);
  const [thang, setThang] = useState(['']);
  const [nam, setNam] = useState(['']);

  const SPBCNgay = async () => {
    const res = await bieuDoNgay();
    if (res && res.data) {
      setNgay(res.data);
    }
  };

  const SPBCThang = async () => {
    const res = await bieuDoThang();
    if (res && res.data) {
      setThang(res.data);
    }
    console.log(res.data);
  };

  const SPBCNam = async () => {
    const res = await bieuDoNam();
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
    handleSPBCNam();
  }, []);

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            return value / 1000000 + 'M';
          },
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">BIỂU ĐỒ DOANH THU</Typography>
                      {selectedMenu === 'ngay' && 'Hôm Nay'}
                      {selectedMenu === 'nam' && `Trong Năm ${currentYear}`}
                      {selectedMenu === 'thang' && `Trong Tháng ${currentMonth}/${currentYear}`}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={selectedMenu} onChange={(e) => setSelectedMenu(e.target.value)}>
                    <MenuItem value="ngay" onClick={handleSPBCNgay}>
                      Hôm nay
                    </MenuItem>
                    <MenuItem value="thang" onClick={handleSPBCThang}>
                      Trong tháng
                    </MenuItem>
                    <MenuItem value="nam" onClick={handleSPBCNam}>
                      Trong năm
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {selectedMenu === 'ngay' && (
                <BarChart margin={{left: 70 }}
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: ngay.map((item) => {
                        const parts = item.split(',');
                        return parts[0];
                      }),
                      scaleType: 'band'
                    }
                  ]}
                  series={[
                    {
                      data: ngay.map((item) => {
                        const parts = item.split(',');
                        return parseFloat(parts[1]);
                      }),
                      label: 'Doanh thu'
                    }
                  ]}
                  width={855}
                  height={532}
                />
              )}
              {selectedMenu === 'thang' && (
                <BarChart margin={{left: 70 }}
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
                      }),
                      label: 'Doanh thu'
                    }
                  ]}
                  width={855}
                  height={532}
                />
              )}
              {selectedMenu === 'nam' && (
                <div>
                  <BarChart margin={{left: 70 }}
                    xAxis={[
                      {
                        id: 'barCategories',
                        data: nam.map((item) => {
                          const parts = item.split(',');
                          return parts[0];
                        }),
                        scaleType: 'band'
                      }
                    ]}
                    series={[
                      {
                        data: nam.map((item) => {
                          const parts = item.split(',');
                          const tien = parseFloat(parts[1]);
                          return tien;
                        }),
                        label: 'Doanh thu'
                      }
                    ]}
                    options={options}
                    width={855}
                    height={554}
                  />
                </div>
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
