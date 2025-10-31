import { Flex } from "antd";
import { useMemo } from "react";
import shoeCategories from '../../../assets/images/categories/shoe_cate.png';
import bagCategories from '../../../assets/images/categories/bag_cate.png';
import phoneCategories from '../../../assets/images/categories/phone_cate.png';
import headphoneCategories from '../../../assets/images/categories/headphone_cate.png';
import glassesCategories from '../../../assets/images/categories/glasses_cate.png';
import carCategories from '../../../assets/images/categories/car_cate.png';
import laptopCategories from '../../../assets/images/categories/laptop_cate.png';
import shirtCategories from '../../../assets/images/categories/shirt_cate.png';
import pantsCategories from '../../../assets/images/categories/pants_cate.png';
import './OutStandingCategories.scss';
import { useTranslation } from "react-i18next";

export const OutStandingCategories: React.FC = () => {
    const { t } = useTranslation();
    const categories = useMemo(() => [
        {
            label: t('category_shoes'),
            image: shoeCategories,
            link: ''
        },
        {
            label: t('category_bags'),
            image: bagCategories,
            link: ''
        },
        {
            label: t('category_phones'),
            image: phoneCategories,
            link: ''
        },
        {
            label: t('category_headphones'),
            image: headphoneCategories,
            link: ''
        },
        {
            label: t('category_glasses'),
            image: glassesCategories,
            link: ''
        },
        {
            label: t('category_vehicles'),
            image: carCategories,
            link: ''
        },
        {
            label: t('category_laptops'),
            image: laptopCategories,
            link: ''
        },
        {
            label: t('category_shirts'),
            image: shirtCategories,
            link: ''
        },
        {
            label: t('category_pants'),
            image: pantsCategories,
            link: ''
        }
    ], [t])

    return (
        <div className="outstanding-categories">
            <h2>{t('outstanding_categories')}</h2>
            <Flex gap={16} wrap="wrap" className="category-list">
                {categories.map((category, index) => (
                    <div key={index} className="category-item">
                        <img src={category.image} alt={category.label} className="category-image" />
                        <span className="category-label">{category.label}</span>
                    </div>
                ))}
            </Flex>
            {/* Category items go here */}
        </div>
    );
};
