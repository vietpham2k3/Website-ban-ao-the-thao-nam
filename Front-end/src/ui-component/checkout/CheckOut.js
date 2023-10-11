import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import '../../scss/CheckOut.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


function CheckoutForm() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');


    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://vapi.vnappmob.com/api/province');
                setProvinces(response.data.results);
            } catch (error) {
                console.error(error);
                toast.error('Đã xảy ra lỗi khi lấy danh sách tỉnh thành');
            }
        };

        fetchProvinces();
    }, []);

    const handleProvinceChange = async (event) => {
        const provinceId = event.target.value;
        setSelectedProvince(provinceId);
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            setDistricts(response.data.results);
            setWards([]);
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi lấy danh sách quận huyện');
        }
    };

    const handleDistrictChange = async (event) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        try {
            const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
            setWards(response.data.results);
        } catch (error) {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi lấy danh sách phường xã');
        }
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    return (
        <div className="site-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-5 mb-md-0">
                        <h2 className="h3 mb-3 text-black">Thông Tin Khách Hàng</h2>
                        <div className="p-3 p-lg-5 border">
                            <div className="form-group row">
                                <div className="col-md-12">
                                    <label htmlFor="full_name" className="text-black">Họ và Tên <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="full_name" name="full_name" placeholder="Họ và Tên"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-12">
                                    <label htmlFor="phone" className="text-black">Số Điện Thoại <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="phone" name="phone" placeholder="Số Điện Thoại" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-12">
                                    <label htmlFor="address" className="text-black">Địa Chỉ <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="Địa chỉ" />
                                </div>
                            </div>


                            <div className="col-md-12">
                                <label htmlFor="province" className="text-black">Tỉnh/Thành Phố <span className="text-danger">*</span></label>
                                <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                                    <option value="">Chọn tỉnh thành</option>
                                    {provinces.map((province) => (
                                        <option key={province.province_id} value={province.province_id}>
                                            {province.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-12 mt-3">
                                <label htmlFor="district" className="text-black">Quận/Huyện <span className="text-danger">*</span></label>
                                <select id="district" className="form-select" value={selectedDistrict} onChange={handleDistrictChange}>
                                    <option value="">Chọn quận huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.district_id} value={district.district_id}>
                                            {district.district_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-12 mt-3">
                                <label htmlFor="ward" className="text-black">Phường/Xã <span className="text-danger">*</span></label>
                                <select id="ward" className="form-select" value={selectedWard} onChange={handleWardChange}>
                                    <option value="">Chọn phường xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.ward_id} value={ward.ward_id}>
                                            {ward.ward_name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="form-group row mb-5">
                                <div className="col-md-12  mt-3">
                                    <label htmlFor="order_notes" className="text-black">Ghi Chú Đơn Hàng</label>
                                    <textarea name="order_notes" id="order_notes" cols="30" rows="5" className="form-control" placeholder="Nhập ghi chú của bạn ở đây..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-5 mb-md-0">
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h2 className="h3 mb-3 text-black">Đơn Hàng</h2>
                                <div className="p-3 p-lg-5 border">
                                    <table className="table site-block-order-table mb-5">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Sản Phẩm</th>
                                                <th>Giá</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="product-image-col">
                                                    <img src="https://tse4.mm.bing.net/th?id=OIP.XS6BIy1MSccDl9mGjM_WxQHaE6&pid=Api&P=0&h=180" alt="Product 1" className="product-image" />
                                                </td>
                                                <td>
                                                    <div className="product-details">
                                                        <span className="product-name">Top Up T-Shirt <strong className="mx-2">x</strong> 1</span>

                                                    </div>
                                                    <span>M - <span className="color-circle" style={{ backgroundColor: 'black' }}></span></span>
                                                </td>

                                                <td>$250.00</td>
                                                <td><Tooltip title="Delete">
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip></td>
                                            </tr>
                                            <tr>
                                                <td className="product-image-col">
                                                    <img src="https://tse3.mm.bing.net/th?id=OIP.w6nn7zgZSO4boZob_zx3uwHaEK&pid=Api&P=0&h=180" alt="Product 2" className="product-image" />
                                                </td>
                                                <td>
                                                    <div className="product-details">
                                                        <span className="product-name">Polo Shirt <strong className="mx-2">x</strong> 1</span>
                                                    </div>
                                                    <span>M - <span className="color-circle" style={{ backgroundColor: 'green' }}></span></span>
                                                </td>
                                                <td>$100.00</td>
                                                <td><Tooltip title="Delete">
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <table className="table site-block-order-table mb-5">
                                        <tr>
                                            <td className="text-black font-weight-bold" colSpan="3"><strong>Tạm Tính</strong></td>
                                            <td className="text-black">$350.00</td>
                                        </tr>
                                        <tr>
                                            <td className="text-black font-weight-bold" colSpan="3"><strong>Mã Giảm Giá</strong></td>
                                            <td className="text-black">
                                                <div className="input-group w-75">
                                                    <input type="text" className="form-control" id="c_code" placeholder="Nhập mã giảm giá" aria-label="Coupon Code" aria-describedby="button-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary btn-sm px-4" type="button" id="button-addon2">Apply</button>
                                                    </div>
                                                </div>
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Danh sách voucher</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul>
                                                                <li>Voucher 1: Giảm 10%</li>
                                                                <li>Voucher 2: Giảm 20%</li>
                                                                <li>Voucher 3: Giảm 30%</li>
                                                                {/* Thêm các voucher khác vào đây */}
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-black font-weight-bold" colSpan="3"><strong>Tổng Cộng</strong></td>
                                            <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td className="text-black font-weight-bold" colSpan="3"><strong>Thanh Toán</strong></td>
                                            <td className="text-black">
                                                <div className="custom-control custom-checkbox custom-control-inline" style={{display: 'flex'}}>
                                                    
                                                        <input style={{ marginTop: '15px'}} type="radio" className="custom-control-input" color="secondary" id="vnpayradio" name="paymentMethod" value="vnpay" />  
                                                    
                                                         <label className="custom-control-label" htmlFor="vnpayradio" style={{marginLeft: '10px', marginTop: '15px'}}>
                                                            Thanh toán qua VNPay
                                                        </label>
                                                    <img width={'50px'} height={'50px'} src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png" alt="VNPay Logo" className="payment-logo" />
                                                </div>
                                                <div className="custom-control custom-checkbox custom-control-inline" style={{display: 'flex'}}>
                                                    
                                                        <input style={{ marginTop: '12px'}} type="radio" className="custom-control-input" color="secondary" id="codradio" name="paymentMethod" value="cod" />
                                                        <label className="custom-control-label" htmlFor="codradio" style={{marginLeft: '10px', marginTop: '12px'}}>
                                                            Thanh toán COD
                                                        </label>
                                                    
                                                    <img width={'36px'} height={'36px'} style={{ marginTop: '8px', marginLeft: '56px'}} src="https://symbols.vn/wp-content/uploads/2021/11/Bieu-tuong-tien-mat-doc-dao.png" alt="COD Logo" className="payment-logo" />
                                                </div>
                                            </td>
                                        </tr>

                                    </table>


                                    <div className="text-center">
                                        <button className="btn btn-primary btn-lg" type="button">Thanh toán</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;


{/* <table className="table site-block-order-table mb-5">
                                        <thead>
                                            <tr>
                                                <th>Sản Phẩm</th>
                                                <th>Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Top Up T-Shirt <strong className="mx-2">x</strong> 1</td>
                                                <td>$250.00</td>
                                            </tr>
                                            <tr>
                                                <td>Polo Shirt <strong className="mx-2">x</strong> 1</td>
                                                <td>$100.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Tạm Tính</strong></td>
                                                <td className="text-black">$350.00</td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Mã Giảm Giá</strong></td>
                                                <td className="text-black">
                                                    <div className="input-group w-75">
                                                        <input type="text" className="form-control" id="c_code" placeholder="Nhập mã giảm giá" aria-label="Coupon Code" aria-describedby="button-addon2" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary btn-sm px-4" type="button" id="button-addon2">Apply</button>
                                                        </div>
                                                    </div>
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>Danh sách voucher</Accordion.Header>
                                                            <Accordion.Body>
                                                                <ul>
                                                                    <li>Voucher 1: Giảm 10%</li>
                                                                    <li>Voucher 2: Giảm 20%</li>
                                                                    <li>Voucher 3: Giảm 30%</li>
                                                                    
                                                                </ul>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Tổng Cộng</strong></td>
                                                <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold"><strong>Thanh Toán</strong></td>
                                                <td className="text-black">
                                                    <div className="custom-control custom-checkbox border p-3 mb-3">
                                                        <input type="checkbox" className="custom-control-input" id="vnpayCheckbox" name="paymentMethod" value="vnpay" />
                                                        <label className="custom-control-label" htmlFor="vnpayCheckbox">
                                                            Thanh toán qua VNPay
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-checkbox border p-3">
                                                        <input type="checkbox" className="custom-control-input" id="codCheckbox" name="paymentMethod" value="cod" />
                                                        <label className="custom-control-label" htmlFor="codCheckbox">
                                                            Thanh toán COD
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}