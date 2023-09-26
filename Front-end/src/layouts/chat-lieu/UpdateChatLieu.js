import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  fetchAllList,
  deleteCL,
  putUpdateCL,
  postCreate,
  detailCL,
  searchCL,
} from "../../service/ServiceChatLieu";

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

function UpdateCL() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: "",
    ten: "",
    trangThai: 0,
  });

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const detail = async (id) => {
    const res = await detailCL(id);
    if (res) {
      setValues(res.data);
    }
  };

  const put = async (id, value) => {
    const res = await putUpdateCL(id, value);
    if (res) {
      toast.success("Cập nhật thành công !");
      navigate("/san-pham/chatlieu");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    put(id, values);
  };

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <div className="body flex-grow-1 px-3">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label className="form-label">MÃ</label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.ma}
                      onChange={(e) => setValues({ ...values, ma: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">TÊN</label>
                    <input
                      type="text"
                      className="form-control"
                      value={values.ten}
                      onChange={(e) => setValues({ ...values, ten: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label style={{ fontWeight: "bold" }} className="form-label me-3">
                      Trạng thái:{" "}
                    </label>
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
                    <br></br>
                    <br></br>
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
                      Update
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

export default UpdateCL;
