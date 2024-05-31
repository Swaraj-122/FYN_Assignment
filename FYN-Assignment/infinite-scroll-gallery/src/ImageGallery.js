import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          page: page,
          per_page: 10,
        },
        headers: {
          Authorization: `617992 RaIW6RnU5-NaXP8iIEYUXgBTIQfEl6pyji65Y1MP21I`, // Replace YOUR_ACCESS_KEY with your actual Unsplash Access Key
        },
      });
      setImages((prevImages) => [...prevImages, ...response.data]);
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image.urls.small} alt={image.alt_description} />
        </div>
      ))}
      {hasMore && <div ref={ref} className="loading">Loading more...</div>}
    </div>
  );
};

export default ImageGallery;
