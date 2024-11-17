import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ProductGallery = ({ productId }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current media index
  const galleryRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Product/${productId}`);
        const { cloudImages, cloudVideos } = response.data;

        // Images first, then videos
        const media = [...cloudImages, ...cloudVideos];
        setMediaItems(media);
        if (media.length > 0) {
          setSelectedMedia(media[0].imagePath || media[0].videoPath); // Default to the first media item
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, [productId]);

  const handleMediaClick = (media) => {
    if (media.videoPath) {
      setSelectedMedia(media.videoPath);
      setIsPlaying(false); // Ensure the video starts paused
    } else {
      setSelectedMedia(media.imagePath);
    }
  };

  const handleVideoClick = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause
  };

  const goToPrev = () => {
    const index = currentIndex > 0 ? currentIndex - 1 : mediaItems.length - 1;
    setCurrentIndex(index);
    const prevMedia = mediaItems[index];
    setSelectedMedia(prevMedia.imagePath || prevMedia.videoPath);
  };

  const goToNext = () => {
    const index = (currentIndex + 1) % mediaItems.length;
    setCurrentIndex(index);
    const nextMedia = mediaItems[index];
    setSelectedMedia(nextMedia.imagePath || nextMedia.videoPath);
  };

  return (
    <div className="flex flex-col items-center space-y-6 md:w-full">
      {/* Main Gallery */}
      <div className="w-full max-w-[500px] h-[500px] bg-gray-100 relative">
        {selectedMedia.endsWith('.mp4') ? (
          <video
            src={selectedMedia}
            controls={isPlaying}
            onClick={handleVideoClick}
            className="w-full h-full object-cover rounded-md shadow-lg"
            style={{ aspectRatio: "1/1" }} // Force 1:1 aspect ratio
          />
        ) : (
          <img
            src={selectedMedia}
            alt="Main product"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
        )}
      </div>

      {/* Media Thumbnails with Navigation */}
      <div className="relative flex items-center space-x-2 overflow-x-auto w-full max-w-[512px]" ref={galleryRef}>
        {/* Left Arrow Button */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300 p-2 text-white focus:outline-none rounded-full"
        >
          &#x3c; {/* Left arrow */}
        </button>

        {/* Thumbnails */}
        <div className="flex justify-center w-full space-x-2 overflow-x-auto px-4">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => handleMediaClick(media)}
              className="w-20 h-20 border-2 border-gray-300 rounded-md shadow-md overflow-hidden"
            >
              {media.videoPath ? (
                <video
                  src={media.videoPath}
                  muted
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }} // Ensure 1:1 aspect ratio for thumbnails
                />
              ) : (
                <img
                  src={media.imagePath}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity duration-300 p-2 text-white focus:outline-none rounded-full"
        >
          &#x3e; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
