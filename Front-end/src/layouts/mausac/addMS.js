import { CCard, CCardBody } from "@coreui/react";
import React, { useState } from "react";
import { postMS } from "src/service/VoucherService/MauSacService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// React components
import SoftBox from "components/SoftBox";

//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AddChatLieu() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    tenMauSac: "",
    trangThai: 1,
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
        <CCard className="mb-4">
          <CCardBody>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={values.tenMauSac}
                  onChange={(e) =>
                    setValues({ ...values, tenMauSac: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label className="form-label me-3">Trạng thái: </label> <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="1"
                    checked={true}
                    onChange={(e) => setValues({ ...values, trangThai: 1 })}
                  />
                  <label className="form-check-label">Hoạt động</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="0"
                    onChange={(e) => setValues({ ...values, trangThai: 0 })}
                  />
                  <label className="form-check-label">Không hoạt động</label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </div>

        </Card>
      </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>

     
    </div>
  );
}

export default AddChatLieu;