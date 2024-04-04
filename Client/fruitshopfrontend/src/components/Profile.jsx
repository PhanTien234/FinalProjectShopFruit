// ProfilePage.jsx
import React, { useState } from 'react';

const ProfilePage = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  // Handle file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Placeholder function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You would handle the form submission here
    // This will likely involve setting up state for each form field
    // and then sending that data to your server
    console.log({ name, email, phone, gender });
  };

  // Helper function to create an array of numbers for years
  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (v, i) => startYear + i);
  };

  return (
    <div className="container mx-auto mt-10">
    <h2 className="text-xl font-semibold mb-4">Hồ Sơ Của Tôi</h2>
     {/* Horizontal Dash */}
     <div className="w-full border-t-2 border-red-500 mb-4"></div>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
        <div className="lg:flex-1 px-4">
          <div className="mb-4">
            <label htmlFor="username" className="text-sm font-semibold">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value="minhtinphan933"
              className="mt-1 w-full border rounded py-2 px-3 text-gray-700"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-semibold">Tên</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              className="mt-1 w-full border rounded py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              className="mt-1 w-full border rounded py-2 px-3 text-gray-700"
            />
            <button type="button" className="mt-1 text-blue-600 hover:text-blue-700 text-sm">Thay Đổi</button>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0123456789"
              className="mt-1 w-full border rounded py-2 px-3 text-gray-700"
            />
            <button type="button" className="mt-1 text-blue-600 hover:text-blue-700 text-sm">Thay Đổi</button>
          </div>
          <div className="mb-4">
            <span className="text-sm font-semibold">Giới tính</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">Nam</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">Nữ</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">Khác</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="text-sm font-semibold">Ngày sinh</label>
            <div className="flex mt-1">
              <select id="birthdate-day" className="w-1/3 border rounded py-2 px-3 text-gray-700 mr-1">
                {/* Generate day options */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select id="birthdate-month" className="w-1/3 border rounded py-2 px-3 text-gray-700 mx-1">
                {/* Generate month options */}
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select id="birthdate-year" className="w-1/3 border rounded py-2 px-3 text-gray-700 ml-1">
                {/* Generate year options */}
                {generateYears(1920).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Lưu
          </button>
        </div>
        {/* Vertical Dash */}
        <div className="hidden lg:block w-px bg-red-300 lg:mx-4"></div>

        <div className="lg:flex-1 flex flex-col items-center px-2">
          <div className={`w-80 h-80 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center overflow-hidden mb-4 ${avatar && 'border-blue-400 border-8'}`}>
            {avatar ? (
              <img src={avatar} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500">Avatar</span>
            )}
          </div>
          <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Chọn Ảnh
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
