import React, { useState } from "react";
import { toast } from "react-toastify";
import InputColor from 'react-input-color';

import { postMS } from "service/ServiceMauSac";

import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// React components
import SoftBox from "components/SoftBox";

//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Button } from "react-bootstrap";
 


function AddMauSac() {

  const [color, setColor] = useState({ r: 94, g: 114, b: 228, a: 1 }); // Giá trị màu mặc định
  const [ma, setMa] = useState('');


  const handleColorChange = (newColor) => {
    setColor(newColor); // Cập nhật giá trị màu từ bảng màu
    setMa(newColor.hex); // Cập nhật giá trị 'ma' từ bảng màu
    setValues({...values, ma: newColor.hex})
  };


  const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: "",
    trangThai: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post(values);
  };


  const post = async (value) => {
    const res = await postMS(value);
    if (res) {
      toast.success("Add succses");
      navigate("/san-pham/mau-sac");
    }
  };


  return (
    <div>

<DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
        <Card >
            
        <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>


      <div className="col-md-6">
      <label style={{ fontWeight: 'bold' }} className="form-label">Mã Màu: </label>
      <br></br>
      <InputColor
        initialValue={values.ma}
        onChange={handleColorChange}
        placement="right"
      />
      <div
        style={{
          width: 300,
          height: 300,
          marginTop: 20,
          backgroundColor: color.rgba,
        }}
      />
    </div>

      {/* <div >
           <label className="form-label">Mã Màu</label>
           <input
                  type="text"
                  className="form-control"
                  value={values.ma}
                  onChange={(e) =>
                    setValues({ ...values, ma: e.target.value })
                  }
                />
             </div> */}

              <div className="col-6">
                <label style={{ fontWeight: 'bold' }} className="form-label me-3">Trạng thái: </label>
                <br></br>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={true}
                    onChange={(e) => setValues({ ...values, trangThai: 0 })}
                  />
                  <label className="form-check-label">Kích hoạt</label>
                </div>
                <br></br><br></br>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    onChange={(e) => setValues({ ...values, trangThai: 1 })}
                  />
                  <label className="form-check-label">Ngừng kích hoạt</label>
                </div>
              </div>
              <div className="col-12">
                <Button type="submit" className="btn btn-bg-info">
                  Thêm
                </Button>
              </div>
            </form>
      </div>

        </Card>
      </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>

     
    </div>
  );
}

export default AddMauSac;