import React from 'react';
import { Card } from 'react-bootstrap';
import MainCard from 'ui-component/cards/MainCard';

function UpdateDiaChi() {
  // Lấy danh sách tỉnh thành từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

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
    setSelectedProvinceName(event.target.options[event.target.selectedIndex].text);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedDistrictName('');
    setSelectedWardName('');
    try {
      if (provinceId) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        setDistricts(response.data.results);
        setWards([]);
      } else {
        setDistricts([]);
        setWards([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách quận huyện');
    }
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedDistrictName(event.target.options[event.target.selectedIndex].text);
    setSelectedWard(null);
    setSelectedWardName('');
    try {
      if (districtId) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        setWards(response.data.results);
      } else {
        setWards([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách phường xã');
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    setSelectedWard(wardId);
    setSelectedWardName(event.target.options[event.target.selectedIndex].text);
  };

  const filteredDistricts = districts.filter((district) => district.province_id === selectedProvince);
  const filteredWards = wards.filter((ward) => ward.district_id === selectedDistrict);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('tinhThanh', selectedProvinceName);
    formData.append('quanHuyen', selectedDistrictName);
    formData.append('phuongXa', selectedWardName);

    try {
      const res = await updateKHFormData(id, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        navigate('/khach-hang');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật khách hàng');
    }
  };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-4">
                <label htmlFor="province" className="form-label">
                  Tỉnh thành
                </label>
                <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">Chọn tỉnh thành</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="district" className="form-label">
                  Quận huyện
                </label>
                <select
                  id="district"
                  className="form-select"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                >
                  <option value="">Chọn quận huyện</option>
                  {filteredDistricts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="ward" className="form-label">
                  Phường xã
                </label>
                <select
                  id="ward"
                  className="form-select"
                  value={selectedWard}
                  onChange={handleWardChange}
                  disabled={!selectedDistrict || !selectedProvince}
                >
                  <option value="">Chọn phường xã</option>
                  {filteredWards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6" style={{ display: 'flex' }}>
                <div className="text-start">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </MainCard>
  );
}

export default UpdateDiaChi;
