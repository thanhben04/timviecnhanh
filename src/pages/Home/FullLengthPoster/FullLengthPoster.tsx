import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './FullLengthPoster.scss';
import { getSampleFullLengthPosters } from './sampleData';

interface FullLengthPosterData {
    id: string;
    title: string;
    desc: string;
    image: string;
    category?: string;
    discount?: string;
    link?: string;
    bgColor?: string;
}

interface FullLengthPostersProps {
    id: string;
}

const FullLengthPosters: React.FC<FullLengthPostersProps> = memo(({ id }) => {
    const { t } = useTranslation();
    const sampleFullLengthPosters = getSampleFullLengthPosters(t);
    const selectedItem = sampleFullLengthPosters.find((item) => item.id === id);

    const handleItemClick = useCallback((item: FullLengthPosterData) => {
        console.log('Item clicked:', item);
        // navigation logic
    }, []);

    const handleBuyNow = useCallback((item: FullLengthPosterData, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log('Buy now clicked:', item);
    }, []);

    if (!selectedItem) return null; // Or display a fallback UI if not found

    return (
        <div className="full-posters-container">
            <div
                key={selectedItem.id}
                className="new-item-card"
                style={{ backgroundColor: selectedItem.bgColor || '#ffffff' }}
                onClick={() => handleItemClick(selectedItem)}
            >
                <div className="item-content">
                    <h3 className="item-title">{selectedItem.title}</h3>
                    <div className="item-desc">{selectedItem.desc}</div>

                    <button
                        className="see-all-btn"
                        onClick={(e) => handleBuyNow(selectedItem, e)}
                    >
                        {t('see_all')}
                    </button>
                </div>
                <div className="item-image">
                    <img src={selectedItem.image} alt={selectedItem.title} />
                </div>
            </div>
        </div>
    );
});

FullLengthPosters.displayName = 'FullLengthPosters';

export default FullLengthPosters;
