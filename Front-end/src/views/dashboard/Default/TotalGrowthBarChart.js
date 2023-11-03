import PropTypes from 'prop-types';

import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { BarChart } from '@mui/x-charts/BarChart';
import '../../../scss/Chart.scss';

const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
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
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>

              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: ['Cặc', 'Lồn', 'Đầu buồi'],
                    scaleType: 'band'
                  }
                ]}
                series={[
                  {
                    data: [2, 10, 3]
                  }
                ]}
                width={1000}
                height={470}
              />
              
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
