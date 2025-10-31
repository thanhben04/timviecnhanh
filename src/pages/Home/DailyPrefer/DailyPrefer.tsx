import React, { memo, useMemo, useCallback } from 'react';
import ProductCard from 'components/ProductCard/ProductCard';
import GeneralSlider from 'components/GeneralSlider/GeneralSlider';
import product1 from 'assets/images/Products/Product1.png';
import product2 from 'assets/images/Products/Product2.png';
import product3 from 'assets/images/Products/Product3.png';
import product4 from 'assets/images/Products/Product4.png';
import product5 from 'assets/images/Products/Product5.png';
import product6 from 'assets/images/Products/Product6.png';
import './DailyPrefer.scss';
import { useIsMobile } from 'hooks/useIsMobile';
import { useTranslation } from 'react-i18next';

interface Product {
    id: string;
    title: string;
    originalPrice: string;
    salePrice: string;
    image: string;
    discount: string;
    isRecommended?: boolean;
    isSimilar?: boolean;
    category?: string;
}

const DailyPrefer: React.FC = memo(() => {

    const { t } = useTranslation();
    const isMobile = useIsMobile();
    // Sample products data - matches your image
    const products: Product[] = useMemo(() => [
        {
            id: '1',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product1,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Bags'
        },
        {
            id: '2',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product2,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Watches'
        },
        {
            id: '3',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product3,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Clothing'
        },
        {
            id: '4',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product4,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Jewelry'
        },
        {
            id: '5',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product5,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Bags'
        },
        {
            id: '6',
            title: t('mini_lady_dior_bag'),
            originalPrice: '₫150.000.000',
            salePrice: '80.000.000',
            image: product6,
            discount: '95%',
            isRecommended: true,
            isSimilar: true,
            category: 'Accessories'
        }
    ], [t]);

    const handleProductClick = useCallback((id: string) => {
        console.log('Product clicked:', id);
        // Navigate to product detail page
    }, []);

    const handleSimilarClick = useCallback((id: string) => {
        console.log('Similar products for:', id);
        // Show similar products or navigate to similar products page
    }, []);

    const handleViewAll = useCallback(() => {
        console.log('View all daily offers');
        // Navigate to daily offers page
    }, []);

    const productCards = useMemo(() => {
        return products.map((product) => (
            <ProductCard
                key={product.id}
                {...product}
                onClick={handleProductClick}
                onSimilarClick={handleSimilarClick}
            />
        ));
    }, [products, handleProductClick, handleSimilarClick]);

    return (
        <section className="daily-prefer">
            <div className="daily-prefer-header">
                <div className="header-content">
                    <h2 className="section-title">{t('daily_deals')}</h2>
                    <p className="section-subtitle">{t('limited_discount_today')}</p>
                </div>
                {!isMobile && (
                    <button className="view-all-btn" onClick={handleViewAll}>
                        {t('view_all')}
                    </button>
                )}
            </div>

            <div className="daily-prefer-content">
                <GeneralSlider
                    itemWidth={280}
                    gap={14}
                    showArrows={true}
                    showDots={false}
                    className="daily-prefer-slider"
                >
                    {productCards}
                </GeneralSlider>
            </div>
        </section>
    );
});

DailyPrefer.displayName = 'DailyPrefer';

export default DailyPrefer;
