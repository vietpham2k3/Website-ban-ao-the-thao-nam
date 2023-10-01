import React from 'react';
import { Image } from 'react-bootstrap';
import '../../scss/Content.scss';

function Content() {
  return (
    <div className="container">
      <h1 className="title">Sản Phẩm Bán Chạy</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="thumbnail">
            <Image
              className="img-thumbnail"
              src="https://savani.vn/images/products/2022/11/29/resized/ao-da-lon-nam-mjd003-3-n0008-1_1669697487.jpg"
            />
            <div className="tenAo">
              <p>Áo Cao Cấp</p>
              <p className="giaGiam">
                1.000.000<ins>đ</ins>{' '}
                <del className="giaGoc">
                  1.900.000<ins>đ</ins>
                </del>
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="title">Sản Phẩm Mới Nhất</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="thumbnail">
            <Image
              className="img-thumbnail"
              src="https://savani.vn/images/products/2022/11/29/resized/ao-da-lon-nam-mjd003-3-n0008-1_1669697487.jpg"
            />
            <div className="tenAo">
              <p>Áo Cao Cấp</p>
              <p className="giaGiam">
                1.000.000<ins>đ</ins>{' '}
                <del className="giaGoc">
                  1.900.000<ins>đ</ins>
                </del>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
