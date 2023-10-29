import SlideBar from 'layout/SlideBar';
import React from 'react';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';

function ChiTietDonHang() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <SlideBar></SlideBar>
          </div>
          <div className="col-9">
            <div className="user-details">
              <h1>cc</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChiTietDonHang;
