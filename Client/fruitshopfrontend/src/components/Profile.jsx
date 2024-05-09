import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const ProfilePage = () => {
  const { user, accessToken } = useAuth();
  const [imageUserPath, setImageUserPath] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null); // Added state to store image file

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Users/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const userData = response.data;
        setFirstName(userData.firstName);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setGender(userData.gender);
        setImageUserPath(userData.imageUserPath); // Set ImageUserPath
        // Set other user data as needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.userId, accessToken]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('gender', gender);
      if (image) {
        formData.append('image', image); // Append ImageUserPath if imageFile exists
      }
      const response = await axios.put(`https://localhost:5001/api/Users/${user.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data' // Set content type for file upload
        }
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUserPath(reader.result); // Set ImageUserPath for preview
      setImage(file); // Set imageFile for submission
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Hồ Sơ Của Tôi</h2>
      {/* Horizontal Dash */}
      <div className="w-full border-t-2 border-red-500 mb-4"></div>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center">
        <div className="lg:flex-1 px-4">
          <div className="mb-4">
            <label htmlFor="name" className="text-sm font-semibold">Tên</label>
            <input
              id="name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0123456789"
              className="mt-1 w-full border rounded py-2 px-3 text-gray-700"
            />
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
          <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Lưu
          </button>
        </div>
        {/* Vertical Dash */}
        <div className="hidden lg:block w-px bg-red-300 lg:mx-4"></div>
        <div className="lg:flex-1 flex flex-col items-center px-2">
          <div className={`w-80 h-80 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center overflow-hidden mb-4 ${imageUserPath && 'border-blue-400 border-8'}`}>
            {imageUserPath ? (
              <img src={imageUserPath} alt="Profile" className="object-cover w-full h-full" />
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
