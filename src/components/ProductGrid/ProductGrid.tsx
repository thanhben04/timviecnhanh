import React, { memo, useMemo, useCallback, useState } from 'react';
import ProductCard from 'components/ProductCard/ProductCard';
import CustomPagination from 'components/CustomPagination/CustomPagination';
import { getSampleNewItems } from 'pages/Home/NewItems/sampleData';
import { useTranslation } from 'react-i18next';
import './ProductGrid.scss';

interface Product {
    id: string;
    brand: string;
    title: string;
    price: string;
    image: any;
    bgColor: string;
    link: string;
    category?: string;
}

interface ProductGridProps {
    title?: string;
    className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = memo(({
    title,
    className = ''
}) => {
    const { t } = useTranslation();
    const sampleNewItems = getSampleNewItems(t);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(24);

    // Sample products data - duplicate sampleNewItems for demonstration
    const allProducts: Product[] = useMemo(() => {
        const products: Product[] = [];

        // Duplicate sampleNewItems 20 times to create 120 products (6 * 20 = 120)
        for (let i = 0; i < 20; i++) {
            sampleNewItems.forEach((item, index) => {
                products.push({
                    ...item,
                    id: `${item.id}-${i}-${index}`, // Unique ID
                });
            });
        }

        return products;
    }, [sampleNewItems]);

    // Calculate pagination
    const total = allProducts.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProducts = allProducts.slice(startIndex, endIndex);

    const handlePageChange = useCallback((page: number, size: number) => {
        setCurrentPage(page);
        setPageSize(size);
        // Scroll to top of grid
        document.querySelector('.product-grid')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, []);

    const handlePageSizeChange = useCallback((current: number, size: number) => {
        setCurrentPage(1); // Reset to first page when changing page size
        setPageSize(size);
    }, []);

    const handleProductClick = useCallback((id: string) => {
        console.log('Product clicked:', id);
        // Navigate to product detail page
    }, []);

    const handleSimilarClick = useCallback((id: string) => {
        console.log('Similar products for:', id);
        // Show similar products
    }, []);

    const renderedProducts = useMemo(() => {
        return currentProducts.map((product) => (
            <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                originalPrice={`₫${parseInt(product.price).toLocaleString('vi-VN')}`}
                salePrice={`₫${Math.floor(parseInt(product.price) * 0.8).toLocaleString('vi-VN')}`}
                image={product.image}
                discount={`${Math.floor(Math.random() * 30 + 20)}% ⚡`}
                isRecommended={Math.random() > 0.7}
                isSimilar={Math.random() > 0.5}
                category={product.brand}
                onClick={handleProductClick}
                onSimilarClick={handleSimilarClick}
            />
        ));
    }, [currentProducts, handleProductClick, handleSimilarClick]); return (
        <section className={`product-grid ${className}`}>
            <div className="product-grid-container">
                {/* <div className="grid-header">
                    <h2 className="grid-title">{title || t('see_all')}</h2>
                    <div className="grid-info">
                        <span>Hiển thị {startIndex + 1}-{Math.min(endIndex, total)} của {total} sản phẩm</span>
                    </div>
                </div> */}
                <h2>{title || t('see_all')}</h2>

                <div className="products-grid">
                    {renderedProducts}
                </div>

                <CustomPagination
                    total={total}
                    current={currentPage}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    showSizeChanger={true}
                    showTotal={true}
                    className="product-grid-pagination"
                />
            </div>
        </section>
    );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
