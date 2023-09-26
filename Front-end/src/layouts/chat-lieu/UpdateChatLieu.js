
import React, { useEffect, useState } from "react";
import { putCL, detailCL } from "src/service/ServiceChatLieu";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function UpdateKhachHang() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ten: "",
    trangThai: "",
  });

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    put(id, values);
  };

  const detail = async (id) => {
    const res = await detailCL(id);
    if (res) {
      setValues(res.data);
    }
  };

  const put = async (id, value) => {
    const res = await putCL(id, value);
    if (res) {
      toast.success("Update succses");
      navigate("/san-pham/chat-lieu");
    }
  };

  return (
    <div>
      <div className="body flex-grow-1 px-3">
        <CCard className="mb-4">
          <CCardBody>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) =>
                    setValues({ ...values, ten: e.target.value })
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
                    checked={values.trangThai === 1}
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
                    checked={values.trangThai === 0}
                    onChange={(e) => setValues({ ...values, trangThai: 0 })}
                  />
                  <label className="form-check-label">Không hoạt động</label>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}

export default UpdateKhachHang;