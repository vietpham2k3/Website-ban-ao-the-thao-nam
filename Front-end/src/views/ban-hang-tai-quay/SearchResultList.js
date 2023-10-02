/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react';
import '../../scss/SearchResult.scss';
import { Table } from 'react-bootstrap';
import TableKCMS from './TableKCMS';
import { useState } from 'react';
import { getAllMSKCCTSP, detailMSKCCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';
import { addSP } from 'services/ServiceDonHang';
import { toast } from 'react-toastify';

function SearchResult(props) {
  const { result, id, getAllById, handleSearchUsers } = props;
  const [show, setShow] = useState(false);
  const [idCTSP, setidCTSP] = useState('');
  const [values, setValues] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [inputDetail, setInputDetail] = useState(null);
  const [valuesAdd, setValuesAdd] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  const handleAddSoLuong = (id) => {
    setShow(true);
    setidCTSP(id);
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } });
  };

  const handleAdd = () => {
    // getAllById(id);
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !');
      return;
    }
    add(dataDetail.id, valuesAdd);
  };

  const add = async (idMSKC, value) => {
    const res = await addSP(idMSKC, value);
    try {
      if (res) {
        handleSearchUsers();
        toast.success('Thêm sản phẩm thành công');
        getAllById(id);
        handleClose();
      }
    } catch (error) {
      toast.error('Lỗi');
    }
  };

  const handleClose = () => {
    setShow(false);
    setInputDetail(null);
    setValuesAdd({
      chiTietSanPham: {
        id: ''
      },
      hoaDon: {
        id: id
      },
      soLuong: ''
    });
  };

  useEffect(() => {
    getAllByIdCTSP(idCTSP);
  }, [idCTSP]);

  const getAllByIdCTSP = async (id) => {
    const res = await getAllMSKCCTSP(id);
    if (res) {
      setValues(res.data);
    }
  };

  const handleDetail = (id) => {
    setInputDetail(id);
    detail(id);
  };

  const detail = async (id) => {
    let res = await detailMSKCCTSP(id);
    if (res) {
      setDataDetail(res.data);
    }
  };

  return (
    <div className="results-list">
      <Table hover>
        <tbody>
          {result.map((d, i) => (
            <tr key={i} onClick={() => handleAddSoLuong(d.id)} style={{ cursor: 'pointer' }}>
              <td>
                <img
                  src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                  className="product-image"
                  style={{ width: '70px', height: '100px' }}
                />
              </td>
              <td>{d.ma}</td>
              <td>{d.sanPham.ten}</td>
              <td>{d.soLuong || 0}</td>
              <td>{convertToCurrency(d.giaBan)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TableKCMS
        show={show}
        handleClose={handleClose}
        values={values}
        setValuesAdd={setValuesAdd}
        handleAdd={handleAdd}
        valuesAdd={valuesAdd}
        handleDetail={handleDetail}
        dataDetail={dataDetail}
        inputDetail={inputDetail}
      ></TableKCMS>
    </div>
  );
}

export default SearchResult;
