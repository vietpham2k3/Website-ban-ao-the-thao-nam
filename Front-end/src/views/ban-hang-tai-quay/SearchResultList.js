/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react';
import '../../scss/SearchResult.scss';
import { Table } from 'react-bootstrap';

function SearchResult(props) {
  const { result, id } = props;

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  return (
    <div className="results-list">
      <Table hover>
        <tbody>
          {result.map((d, i) => (
            <tr key={i} onClick={() => console.log(d.id)} style={{ cursor: 'pointer' }}>
              <td>
                <img
                  src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                  className="product-image"
                  style={{ width: '70px', height: '100px' }}
                />
              </td>
              <td>{d.ma}</td>
              <td>{d.sanPham.ten}</td>
              <td>{id}</td>
              <td>{d.soLuong || 0}</td>
              <td>{convertToCurrency(d.giaBan)}</td>
              <td>{d.trangThai === 1 ? 'Kinh doanh' : 'Ngừng kinh doanh'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchResult;
