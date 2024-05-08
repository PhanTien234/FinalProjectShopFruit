import React, { useState, useEffect } from 'react';

const provincesData = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm"],
  "TP Hồ Chí Minh": ["Quận 1", "Quận 2"],
  "Đà Nẵng": ["Liên Chiểu", "Ngũ Hành Sơn"]
};

const districtsData = {
  "Ba Đình": ["Phường Phúc Xá", "Phường Trúc Bạch"],
  "Hoàn Kiếm": ["Phường Hàng Bài", "Phường Hàng Gai"],
  "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành"],
  "Quận 2": ["Phường An Khánh", "Phường An Lợi Đông"]
};

const VietnamAddress = ({ onAddressChange }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (selectedProvince) {
      setDistricts(provincesData[selectedProvince]);
      setSelectedDistrict('');
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setWards(districtsData[selectedDistrict]);
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    onAddressChange(e.target.value, '', '');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    onAddressChange(selectedProvince, e.target.value, '');
  };

  const handleWardChange = (e) => {
    onAddressChange(selectedProvince, selectedDistrict, e.target.value);
  };

  return (
    <div className="flex space-x-2">
      <select
        onChange={handleProvinceChange}
        value={selectedProvince}
        className="border p-2 flex-1"
      >
        <option value="">Chọn Tỉnh/Thành phố</option>
        {Object.keys(provincesData).map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
      <select
        onChange={handleDistrictChange}
        value={selectedDistrict}
        className="border p-2 flex-1"
        disabled={!selectedProvince}
      >
        <option value="">Chọn Quận/Huyện</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <select
        onChange={handleWardChange}
        className="border p-2 flex-1"
        disabled={!selectedDistrict}
      >
        <option value="">Chọn Phường/Xã</option>
        {wards.map((ward) => (
          <option key={ward} value={ward}>
            {ward}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VietnamAddress;