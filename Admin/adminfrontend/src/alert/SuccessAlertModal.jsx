import React from 'react';

const SuccessModal = ({ handleClose }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <p className="text-lg font-semibold mb-4">Payment Method Updated Successfully!</p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
