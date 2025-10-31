import { memo, useCallback, useMemo } from "react";
import { getProductListSampleData } from './sampleData';
import { Flex } from "antd";
import './ProductList.scss';
import { RightArrowIcon } from "assets/icons/outlined/RightArrowIcon";
import GeneralSlider from "components/GeneralSlider/GeneralSlider";
import ProductCard from "components/ProductCard/ProductCard";
import { useTranslation } from "react-i18next";

interface ProductListProps {
    id?: number;
}

export const ProductList: React.FC<ProductListProps> = memo(({ id }) => {
    const { t } = useTranslation();
    const productListSampleData = getProductListSampleData(t);

    const selectedItem = productListSampleData.find((item) => {
        /* Change when have data from api */
        if (!id) return 1;
        return item.id === id;
    });

    const handleProductClick = useCallback((id: string) => {
        console.log('Product clicked:', id);
        // Navigate to product detail page
    }, []);

    const handleSimilarClick = useCallback((id: string) => {
        console.log('Similar products for:', id);
        // Show similar products or navigate to similar products page
    }, []);


    const productCards = useMemo(() => {
        return selectedItem?.elements?.map((product) => (
            <ProductCard
                key={product.id}
                {...product}
                onClick={handleProductClick}
                onSimilarClick={handleSimilarClick}
            />
        ));
    }, [handleProductClick, handleSimilarClick, selectedItem?.elements]);


    return (
        <div>
            {selectedItem && (
                <Flex vertical gap={16} className="product-list-wrapper">
                    {/* Change when have data from api */}
                    {id && (
                        <Flex justify="space-between" align="center" className="product-list-container">
                            <h2>{selectedItem.label}</h2>
                            <Flex gap={12} className="product-list-brands">
                                {selectedItem.brands.map((brand, index) => (
                                    <button key={index} className="brand-button">
                                        {brand}
                                    </button>
                                ))}
                                <button className="brand-button see-all-button">
                                    {t('see_all')}
                                    <RightArrowIcon stroke='#d00000' />
                                </button>
                            </Flex>
                        </Flex>
                    )}
                    <GeneralSlider
                        itemWidth={280}
                        gap={8}
                        showArrows={true}
                        showDots={false}
                        className="daily-prefer-slider"
                    >
                        {productCards || []}
                    </GeneralSlider>
                </Flex>

            )}
        </div>
    )
})