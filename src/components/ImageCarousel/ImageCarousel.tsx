import React, { memo, useMemo } from 'react';
import { Carousel } from 'antd';
import type { CarouselProps } from 'antd';
import './ImageCarousel.scss';

interface ImageCarouselProps {
    images: string[];
    carouselProps?: CarouselProps;
    autoplay?: boolean;
    dots?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = memo(({
    images,
    carouselProps,
    autoplay = true,
    dots = true
}) => {
    const carouselItems = useMemo(() => {
        return images.map((src, index) => (
            <div key={index} className="carousel-slide">
                <img
                    src={src}
                    alt={`carousel-${index}`}
                    className="carousel-image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                />
            </div>
        ));
    }, [images]);

    const defaultCarouselProps: CarouselProps = {
        autoplay,
        dots,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...carouselProps
    };

    if (!images || images.length === 0) {
        return (
            <div className="carousel-placeholder">
                <span>No images to display</span>
            </div>
        );
    }

    return (
        <div className="image-carousel-container">
            <Carousel {...defaultCarouselProps}>
                {carouselItems}
            </Carousel>
        </div>
    );
});

ImageCarousel.displayName = 'ImageCarousel';

export default ImageCarousel;
