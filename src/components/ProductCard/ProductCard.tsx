import React, { memo } from 'react';
import './ProductCard.scss';
import { CrownIcon } from 'assets/icons/CrownIcon';
import { Flex } from 'antd';
import { ShoppingIcon } from 'assets/icons/solid/ShoppingIcon';
import { Link } from 'react-router-dom';
import { RightArrowIcon } from 'assets/icons/outlined/RightArrowIcon';
import { useIsMobile } from 'hooks/useIsMobile';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
    id: string;
    title: string;
    originalPrice: string;
    salePrice: string;
    image: string;
    discount: string;
    isRecommended?: boolean;
    isSimilar?: boolean;
    category?: string;
    onClick?: (id: string) => void;
    onSimilarClick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({
    id,
    title,
    originalPrice,
    salePrice,
    image,
    discount,
    isRecommended = false,
    isSimilar = false,
    category,
    onClick,
    onSimilarClick
}) => {
    const { t } = useTranslation();
    const isMobile = useIsMobile()
    const handleClick = () => {
        onClick?.(id);
    };

    const handleSimilarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSimilarClick?.(id);
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-image-container">
                <img src={image} alt={title} className="product-image" />

                <Flex className="discount">
                    <div className="discount-badge">{discount}</div>
                    <div className="discount-badge S">S</div>
                </Flex>

                {isRecommended && (
                    <div className="recommendation-badge">
                        <CrownIcon />
                        <span>{t('verified')}</span>
                    </div>
                )}
            </div>

            <div className="product-content">
                <h3 className="product-title">{title}</h3>

                <div className="price-container">
                    <div>
                        <div className="original-price">{originalPrice}</div>
                        <div className="sale-price">₫{salePrice}</div>
                    </div>
                    <Link to=''><ShoppingIcon /></Link>
                </div>

                {!isMobile && (
                    <button className="similar-product-btn" onClick={handleSimilarClick}>
                        {t('similar_products')}
                        <RightArrowIcon stroke='#d00000' />
                    </button>
                )}
            </div>
        </div >
    );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
