import React, { memo, useRef, useState, useCallback } from 'react';
import './GeneralSlider.scss';
import { ArrowCircleLeft } from 'assets/icons/solid/ArrowCircleLeft';
import { ArrowCircleRight } from 'assets/icons/solid/ArrowCircleRight';

interface GeneralSliderProps {
    children: React.ReactNode[];
    itemWidth?: number;
    gap?: number;
    showArrows?: boolean;
    showDots?: boolean;
    className?: string;
}

const GeneralSlider: React.FC<GeneralSliderProps> = memo(({
    children,
    itemWidth = 280,
    gap = 20,
    showArrows = true,
    showDots = false,
    className = ''
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const updateScrollPosition = useCallback(() => {
        if (!sliderRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setIsAtStart(scrollLeft <= 10);
        setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
    }, []);

    const scrollToPosition = useCallback((position: number) => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollTo({
            left: position,
            behavior: 'smooth'
        });
    }, []);

    const handlePrevious = useCallback(() => {
        if (!sliderRef.current) return;

        const scrollAmount = itemWidth + gap;
        const newPosition = Math.max(0, sliderRef.current.scrollLeft - scrollAmount * 2);
        scrollToPosition(newPosition);
    }, [itemWidth, gap, scrollToPosition]);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;

        const scrollAmount = itemWidth + gap;
        const newPosition = sliderRef.current.scrollLeft + scrollAmount * 2;
        scrollToPosition(newPosition);
    }, [itemWidth, gap, scrollToPosition]);

    const handleScroll = useCallback(() => {
        updateScrollPosition();
    }, [updateScrollPosition]);

    return (
        <div className={`general-slider ${className}`}>
            <div className="slider-container">
                {showArrows && (
                    <button
                        className={`slider-arrow slider-arrow-left ${isAtStart ? 'disabled' : ''}`}
                        onClick={handlePrevious}
                        disabled={isAtStart}
                    >
                        <ArrowCircleLeft />
                    </button>
                )}

                <div
                    ref={sliderRef}
                    className="slider-content"
                    onScroll={handleScroll}
                    style={{
                        gap: `${gap}px`
                    }}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="slider-item"
                        // style={{
                        //     marginRight: `${gap}px`
                        // }}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <button
                        className={`slider-arrow slider-arrow-right ${isAtEnd ? 'disabled' : ''}`}
                        onClick={handleNext}
                        disabled={isAtEnd}
                    >
                        <ArrowCircleRight />
                    </button>
                )}
            </div>

            {
                showDots && (
                    <div className="slider-dots">
                        {Array.from({ length: Math.ceil(children.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    const position = index * (itemWidth + gap) * 4;
                                    scrollToPosition(position);
                                    setCurrentIndex(index);
                                }}
                            />
                        ))}
                    </div>
                )
            }
        </div >
    );
});

GeneralSlider.displayName = 'GeneralSlider';

export default GeneralSlider;
