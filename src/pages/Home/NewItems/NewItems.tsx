import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './NewItems.scss';
import { getSampleNewItems } from './sampleData';

interface NewItemData {
    id: string;
    brand: string;
    title: string;
    price: string;
    image: string;
    category?: string;
    discount?: string;
    link?: string;
    bgColor?: string;
}

const NewItems: React.FC = memo(() => {
    const { t } = useTranslation();
    const sampleNewItems = getSampleNewItems(t);

    const handleItemClick = useCallback((item: NewItemData) => {
        console.log('Item clicked:', item);
        // navigation logic
    }, []);

    const handleBuyNow = useCallback((item: NewItemData, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log('Buy now clicked:', item);
    }, []);

    const formatPrice = useCallback((price: string) => {
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }, []);

    return (
        <div className="new-items-container">
            <div className="new-items-grid">
                {sampleNewItems.map((item) => (
                    <div
                        key={item.id}
                        className="new-item-card"
                        style={{ backgroundColor: item.bgColor || '#ffffff' }}
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="item-content">
                            <div className="item-brand">{item.brand}</div>
                            <h3 className="item-title">{item.title}</h3>
                            <div className="item-price">{t('from_price')} {formatPrice(item.price)}đ</div>

                            <button
                                className="buy-now-btn"
                                onClick={(e) => handleBuyNow(item, e)}
                            >
                                {t('buy_now')}
                            </button>
                        </div>
                        <div className="item-image">
                            <img src={item.image} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

NewItems.displayName = 'NewItems';

export default NewItems;
