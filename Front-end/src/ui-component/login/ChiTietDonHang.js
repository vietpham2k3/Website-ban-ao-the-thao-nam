import SlideBar from 'layout/SlideBar';
import React from 'react';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
// import '../../scss/information.scss';

function ChiTietDonHang() {
  const steps = ['Đặt đơn', 'Thanh toán', 'Giao hàng', 'Hoàn thành'];
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row slide-bar">
          <div className="col-2">
            <SlideBar></SlideBar>
          </div>
          <div className="separator"></div>
          <div className="col-9">
            <div className="user-details card-box row">
              <div className="col-12 d-flex align-items-center" style={{ height: 170, borderBottom: '1px solid gray' }}>
                <Box sx={{ width: '100%' }}>
                  <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label, i) => (
                      <Step key={i}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
              <h4 style={{ padding: '20px 0 20px 30px' }}>Địa chỉ nhận hàng</h4>
              <div className="col-12 d-flex">
                <div className="col-5">
                  <h6 style={{ padding: '0 0 0 20px' }}>Con cặc</h6>
                  <p style={{ padding: '0 0 0 20px' }}>
                    0230975473 <br />
                    Nhà đầu buồi, xã con cặc, tỉnh lồn
                  </p>
                </div>
                <div className="col-7" style={{ borderLeft: '1px solid gray' }}>
                  <Timeline
                    sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2
                      }
                    }}
                  >
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">09:30 am</TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="success" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>Eat</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">10:00 am</TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>Code</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
              </div>
              <div className="col-12">
                <table className="table">
                  <tr>
                    <td style={{ padding: '0 0 0 20px' }}>Mark</td>
                    <td>Otto</td>
                    <td className="d-flex justify-content-end me-3">@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>div</td>
                  </tr>
                  <tr>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>div</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChiTietDonHang;
