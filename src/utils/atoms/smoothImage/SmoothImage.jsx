import React, { useState } from "react";
import notFound from "../../../assets/notFound.jpg";
import "./smoothImage.css";

/**
 * Wrapper component to show loader while image is not fully loaded
 * @returns
 */
function SmoothImage({
  src,
  alt,
  className,
  loading,
  fallbackImage = notFound,
  width,
  height,
}) {
  const [imageDetail, setImageDetails] = useState({
    src,
    hasError: false,
    isImageLoaded: false,
  });

  const handleImageError = () => {
    setImageDetails({
      src: fallbackImage,
      hasError: true,
      isImageLoaded: true,
    });
  };

  const handleLoadImage = () => {
    setImageDetails((prevData) => ({
      ...prevData,
      isImageLoaded: true,
    }));
  };

  return (
    <div
      className={`smoothImageContainer ${
        imageDetail.hasError ? "imageFallbackContainer" : ""
      } ${className}`}
    >
      <img
        className={`${className} ${
          imageDetail.hasError ? "imageFallback fallbackClassName" : ""
        }`}
        alt={alt}
        src={imageDetail.src}
        onLoad={handleLoadImage}
        onError={handleImageError}
        loading={loading || "lazy"}
        style={{
          visibility: imageDetail.isImageLoaded ? "visible" : "hidden",
        }}
        height={height}
        width={width}
      />
      {!imageDetail.isImageLoaded && (
        <div className={"showImageSkelton"}></div>
      )}
    </div>
  );
}

export default SmoothImage;
