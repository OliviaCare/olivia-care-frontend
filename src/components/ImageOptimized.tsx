import React from 'react';

interface ImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const ImageOptimized: React.FC<ImageOptimizedProps> = ({
  src,
  alt,
  className = '',
  width,
  height
}) => {
  // Generar srcset para diferentes tamaños de pantalla
  const generateSrcSet = (url: string) => {
    const sizes = [320, 640, 960, 1280];
    return sizes
      .map(size => {
        const imgUrl = new URL(url);
        imgUrl.searchParams.set('w', size.toString());
        return `${imgUrl.toString()} ${size}w`;
      })
      .join(', ');
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} w-full h-auto`}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      srcSet={generateSrcSet(src)}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={(e) => {
        e.currentTarget.src = '/placeholder.jpg';
      }}
    />
  );
};

export default ImageOptimized;