import { postCL } from "../../service/ServiceChatLieu";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

function AddChatLieu() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ten: "",
    trangThai: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post(values);
  };

  const post = async (value) => {
    const res = await postCL(value);
    if (res) {
      toast.success("Add succses");
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
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
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
    </div>
  );
}

export default AddChatLieu;
