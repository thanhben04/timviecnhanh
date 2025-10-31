import product1 from 'assets/images/Products/Product1.png';
import product2 from 'assets/images/Products/Product2.png';
import product3 from 'assets/images/Products/Product3.png';
import product4 from 'assets/images/Products/Product4.png';
import product5 from 'assets/images/Products/Product5.png';
import product6 from 'assets/images/Products/Product6.png';

const getProductListSampleData = (t: (key: string) => string) => [
    {
        id: 1,
        label: t('product_list_bags'),
        brands: ["Hermès", "Louis Vuitton", "Chanel", "Gucci", "Dior"],
        elements: [
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
        ]
    },
    {
        id: 2,
        label: t('product_list_appliances'),
        brands: ["Dyson", "Phillips", "Panasonic", "Electrolux", "Tefal"],
        elements: [
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
        ]
    },
    {
        id: 3,
        label: t('product_list_clothes'),
        brands: ["Dior", "Gucci", "Louis Vuitton", "Chanel", "Balenciaga"],
        elements: [
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
        ]
    },
    {
        id: 4,
        label: t('product_list_phones'),
        brands: ["Iphone", "Samsung", "Xiaomi", "OPPO", "Realme"],
        elements: [
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
        ]
    }
];

// Keep the original static export for backward compatibility
const productListSampleData = getProductListSampleData((key: string) => key);

export { getProductListSampleData };
export default productListSampleData;