import React, { useState } from 'react';
import facebookIcon from '../assets/icons/facebookicon.png';
import twitterIcon from '../assets/icons/twittericon.png';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; // Import both outlined and filled heart icons

const SocialShare = () => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleFacebookShare = () => {
    const shareURL = 'https://example.com';
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`, '_blank');
  };

  const handleTwitterShare = () => {
    const shareURL = 'https://example.com';
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareURL)}`, '_blank');
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    setWishlistCount(count => isInWishlist ? count - 1 : count + 1);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Facebook Share Button */}
      <button aria-label="Share on Facebook" onClick={handleFacebookShare}>
        <img src={facebookIcon} alt="Facebook Icon" className="w-6 h-6" />
      </button>
      {/* Twitter Share Button */}
      <button aria-label="Share on Twitter" onClick={handleTwitterShare}>
        <img src={twitterIcon} alt="Twitter Icon" className="w-6 h-6" />
      </button>
      {/* Wishlist Heart Button */}
      <button
        aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        onClick={handleWishlistToggle}
        className="hover:text-red-600 transition-colors duration-200"
      >
        {isInWishlist ? (
          <HeartFilled style={{ color: 'red', fontSize: '24px' }} />
        ) : (
          <HeartOutlined style={{ color: 'red', fontSize: '24px' }} />
        )}
      </button>
      <span className="text-gray-600">{wishlistCount}</span>
    </div>
  );
};

export default SocialShare;
